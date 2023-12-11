from rest_framework.serializers import ModelSerializer
from .models import Notification

class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    def create(self, validated_data):
        receiver = self.context['request'].user
        validated_data.pop('receiver')
        sender = validated_data.pop('sender')
        return Notification.objects.create(sender=sender, receiver=receiver, **validated_data)