from rest_framework import viewsets, permissions, filters
from .models import Registration
from .serializers import RegistrationSerializer

class RegistrationViewSet(viewsets.ModelViewSet):
    """
    مدیریت ثبت‌نام کاربران در ایونت‌ها و تعاملات
    """
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # نمایش ثبت‌نام‌های کاربر جاری (مگر اینکه ادمین باشد)
        user = self.request.user
        if user.is_staff:
            return Registration.objects.all()
        return Registration.objects.filter(user=user)