from django.contrib import admin
from .models import Event, EventStage


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'organizer', 'status', 'capacity')


@admin.register(EventStage)
class EventStageAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'title', 'order')