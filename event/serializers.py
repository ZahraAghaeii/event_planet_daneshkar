from rest_framework import serializers
from .models import Event, EventStage

class EventStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStage
        fields = ['id', 'title', 'order', 'speaker', 'status', 'started_at', 'finished_at']
        read_only_fields = ['status', 'started_at', 'finished_at']


class EventSerializer(serializers.ModelSerializer):
    organizer = serializers.ReadOnlyField(source='organizer.username')
    stages = EventStageSerializer(many=True, read_only=True)
    dynamic_attributes = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'organizer', 'title', 'description', 'category', 
            'capacity', 'status', 'start_time', 'end_time', 
            'stages', 'dynamic_attributes'
        ]

    def get_dynamic_attributes(self, obj):
        # جهت جلوگیری از Circular Import (ایمپورت چرخه‌ای)
        from attribute.serializers import EventAttributeValueSerializer
        return EventAttributeValueSerializer(obj.attribute_values.all(), many=True).data

    def validate_status(self, new_status):
        if self.instance:
            current_status = self.instance.status
            
            # قوانین منطقی انتقال وضعیت‌ها
            valid_transitions = {
                Event.Status.DRAFT: [Event.Status.PUBLISHED],
                Event.Status.PUBLISHED: [Event.Status.CLOSED],
                Event.Status.CLOSED: [Event.Status.FINISHED],
                Event.Status.FINISHED: []  # پس از پایان رویداد، تغییر مجاز نیست
            }

            if new_status != current_status and new_status not in valid_transitions.get(current_status, []):
                raise serializers.ValidationError(
                    f"انتقال وضعیت از {current_status} به {new_status} مجاز نیست."
                )
        return new_status