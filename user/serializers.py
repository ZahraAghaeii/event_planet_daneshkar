from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from . import serializers

User = get_user_model()

# پیدا کردن خودکار سریالایزر کاربر یا ثبت‌نام از روی ماژول serializers
UserSerializer = getattr(serializers, 'UserSerializer', getattr(serializers, 'CustomUserSerializer', None))
RegisterSerializer = getattr(serializers, 'RegisterSerializer', getattr(serializers, 'UserRegisterSerializer', None))

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer if RegisterSerializer else serializers.UserSerializer
    permission_classes = [permissions.AllowAny]

class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer if UserSerializer else serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user