from django.db import models
from core.models import TimeStampedModel
from event.models import Event
from user.models import CustomUser

class Registration(TimeStampedModel):
    class PaymentStatus(models.TextChoices):
        PENDING = 'PENDING', 'در انتظار پرداخت'
        PAID = 'PAID', 'تأییدشده و پرداخت‌شده'
        CANCELLED = 'CANCELLED', 'لغوشده'

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    participant = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='my_registrations')
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)

    class Meta:
        unique_together = ('event', 'participant')

    def __str__(self):
        return f"{self.participant.username} -> {self.event.title}"


class Feedback(TimeStampedModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='feedbacks')
    participant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(verbose_name="امتیاز (1 تا 5)")
    comment = models.TextField(verbose_name="نظر")

    class Meta:
        unique_together = ('event', 'participant')


class Result(TimeStampedModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='results')
    participant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    score = models.CharField(max_length=100, verbose_name="امتیاز/رتبه")
    details = models.TextField(blank=True, verbose_name="جزئیات")

    class Meta:
        unique_together = ('event', 'participant')