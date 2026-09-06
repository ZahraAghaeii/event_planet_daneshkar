from rest_framework import viewsets, permissions, filters
from .models import Attribute
from .serializers import AttributeSerializer

class AttributeViewSet(viewsets.ModelViewSet):
    """
    مدیریت ویژگی‌ها و مشخصات سفارشی رویدادها
    """
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'key'] if hasattr(Attribute, 'key') else ['name']