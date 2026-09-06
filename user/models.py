from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import TimeStampedModel

class CustomUser(AbstractUser, TimeStampedModel):
    class Role(models.TextChoices):
        ORGANIZER = 'ORGANIZER', 'برگزارکننده'
        PARTICIPANT = 'PARTICIPANT', 'شرکت‌کننده'

    role = models.CharField(
        max_length=20, 
        choices=Role.choices, 
        default=Role.PARTICIPANT,
        verbose_name="نقش کاربر"
    )

    def is_organizer(self):
        return self.role == self.Role.ORGANIZER

    def is_participant(self):
        return self.role == self.Role.PARTICIPANT