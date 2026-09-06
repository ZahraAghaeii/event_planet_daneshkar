from django.db import models
from django.core.exceptions import ValidationError
from django.utils.text import slugify
from core.models import TimeStampedModel
from user.models import CustomUser

class Event(TimeStampedModel):
    class Status(models.TextChoices):
        DRAFT = 'DRAFT', 'پیش‌نویس'
        PUBLISHED = 'PUBLISHED', 'منتشرشده'
        CLOSED = 'CLOSED', 'بسته شده'
        FINISHED = 'FINISHED', 'پایان‌یافته'

    class Category(models.TextChoices):
        TOURNAMENT = 'TOURNAMENT', 'تورنمنت'
        WEBINAR = 'WEBINAR', 'وبینار'
        WORKSHOP = 'WORKSHOP', 'ورکشاپ'
        SPORTS = 'SPORTS', 'ورزشی'

    title = models.CharField(max_length=255, verbose_name="عنوان رویداد")
    slug = models.SlugField(unique=True, blank=True, verbose_name="شناسه متنی (Slug)")
    description = models.TextField(verbose_name="توضیحات")
    category = models.CharField(max_length=20, choices=Category.choices, verbose_name="دسته‌بندی")
    organizer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='organized_events', verbose_name="برگزارکننده")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT, verbose_name="وضعیت")
    capacity = models.PositiveIntegerField(verbose_name="ظرفیت کل")
    image = models.ImageField(upload_to='events/banners/', null=True, blank=True, verbose_name="تصویر بنر")
    start_time = models.DateTimeField(verbose_name="زمان شروع")
    end_time = models.DateTimeField(verbose_name="زمان پایان")

    class Meta:
        ordering = ['-created_at']

    def clean(self):
        if self.start_time and self.end_time and self.end_time <= self.start_time:
            raise ValidationError({'end_time': 'زمان پایان باید بعد از زمان شروع باشد.'})

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        self.full_clean()
        super().save(*args, **kwargs)

    def remaining_capacity(self):
        registered_count = self.registrations.filter(payment_status='PAID').count()
        return max(0, self.capacity - registered_count)

    def __str__(self):
        return self.title


class EventStage(TimeStampedModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='stages', verbose_name="رویداد مربوطه")
    title = models.CharField(max_length=255, verbose_name="عنوان جلسه/راند")
    description = models.TextField(blank=True, verbose_name="توضیحات جلسه")
    order = models.PositiveIntegerField(default=1, verbose_name="ترتیب برگزاری")
    start_time = models.DateTimeField(verbose_name="زمان شروع جلسه")
    end_time = models.DateTimeField(verbose_name="زمان پایان جلسه")
    stage_capacity = models.PositiveIntegerField(null=True, blank=True, verbose_name="ظرفیت اختصاصی جلسه")

    class Meta:
        ordering = ['order', 'start_time']

    def clean(self):
        if self.start_time and self.end_time and self.end_time <= self.start_time:
            raise ValidationError('زمان پایان جلسه باید بعد از زمان شروع باشد.')
        if self.stage_capacity and self.stage_capacity > self.event.capacity:
            raise ValidationError('ظرفیت جلسه نمی‌تواند از ظرفیت کل رویداد بیشتر باشد.')

    def __str__(self):
        return f"{self.event.title} - {self.title} (جلسه {self.order})"


class StageRole(TimeStampedModel):
    class RoleType(models.TextChoices):
        SPEAKER = 'SPEAKER', 'سخنران'
        JUDGE = 'JUDGE', 'داور'
        COACH = 'COACH', 'مربی'

    stage = models.ForeignKey(EventStage, on_delete=models.CASCADE, related_name='roles', verbose_name="جلسه مربوطه")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="کاربر")
    role_type = models.CharField(max_length=20, choices=RoleType.choices, verbose_name="نوع نقش")

    class Meta:
        unique_together = ('stage', 'user', 'role_type')