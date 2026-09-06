from django.db import models
from event.models import Event
from core.models import TimeStampedModel

class Attribute(TimeStampedModel):
    name = models.CharField(max_length=100, verbose_name="نام ویژگی")
    slug = models.SlugField(unique=True, verbose_name="شناسه متنی")

    def __str__(self):
        return self.name

class EventAttributeValue(TimeStampedModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='attribute_values')
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
    value = models.TextField(verbose_name="مقدار")

    class Meta:
        unique_together = ('event', 'attribute')