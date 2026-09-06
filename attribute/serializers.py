from rest_framework import serializers
from .models import Attribute, EventAttributeValue

class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ['id', 'name', 'slug', 'data_type']


class EventAttributeValueSerializer(serializers.ModelSerializer):
    attribute_name = serializers.CharField(source='attribute.name', read_only=True)
    attribute_slug = serializers.CharField(source='attribute.slug', read_only=True)
    value = serializers.ReadOnlyField()

    class Meta:
        model = EventAttributeValue
        fields = ['id', 'attribute', 'attribute_name', 'attribute_slug', 'value', 'value_string', 'value_number', 'value_boolean']