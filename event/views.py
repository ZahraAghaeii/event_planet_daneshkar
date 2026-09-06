from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event, EventStage
from .serializers import EventSerializer, EventStageSerializer

class EventViewSet(viewsets.ModelViewSet):
    """
    مدیریت کامل رویدادها همراه با قابلیت فیلتر، جستجو و مرتب‌سازی
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    # قابلیت‌های فیلتر و جستجو برای حرفه‌ای‌تر شدن API
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'category'] if hasattr(Event, 'category') else ['status']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'start_date'] if hasattr(Event, 'start_date') else ['created_at']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventStageViewSet(viewsets.ModelViewSet):
    """
    مدیریت مراحل/سانس‌های هر رویداد
    """
    queryset = EventStage.objects.all()
    serializer_class = EventStageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]