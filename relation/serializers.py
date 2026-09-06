from rest_framework import serializers
from .models import Registration, Feedback, Result

class RegistrationSerializer(serializers.ModelSerializer):
    participant = serializers.ReadOnlyField(source='participant.username')
    event_title = serializers.ReadOnlyField(source='event.title')

    class Meta:
        model = Registration
        fields = ['id', 'participant', 'event', 'event_title', 'registered_at']


class FeedbackSerializer(serializers.ModelSerializer):
    participant = serializers.ReadOnlyField(source='participant.username')

    class Meta:
        model = Feedback
        fields = ['id', 'participant', 'event', 'rating', 'comment', 'created_at']


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['id', 'event', 'title', 'description', 'published_at']