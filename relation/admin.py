from django.contrib import admin
from .models import Registration, Feedback, Result


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'created_at')


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'rating', 'created_at')


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'created_at')