from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import UserAccount

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        fields = ('id', 'email', 'name', 'password', 'is_admin')
