from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, EventStageViewSet

router = DefaultRouter()
router.register(r'stages', EventStageViewSet, basename='event-stage')
router.register(r'', EventViewSet, basename='event')

urlpatterns = [
    path('', include(router.urls)),
]