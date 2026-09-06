from rest_framework import permissions

class IsOrganizer(permissions.BasePermission):
    """اجازه دسترسی فقط به کاربرانی که نقش برگزارکننده دارند"""
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'ORGANIZER'
        )

class IsOrganizerOrReadOnly(permissions.BasePermission):
    """دسترس خواندن برای همه، ویرایش/ایجاد فقط برای برگزارکننده"""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'ORGANIZER'
        )