from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),
    
    # Frontend Base Page
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    
    # API Routes
    path('api/v1/user/', include('user.urls')),
    path('api/v1/event/', include('event.urls')),
    path('api/v1/attribute/', include('attribute.urls')),
    path('api/v1/relation/', include('relation.urls')),
]