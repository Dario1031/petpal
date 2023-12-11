from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import Message
from rest_framework import serializers
from accounts.models import PetPalUser
from django.db import models
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError

class MessageSerializer(ModelSerializer):
    sender = ReadOnlyField(source='sender.username')
    recipient = serializers.CharField()

    class Meta:
        model = Message
        fields = ['recipient', 'sender', 'content', 'timestamp']

    def create(self, validated_data):
        sender = self.context['request'].user
        recipient_username = validated_data.pop('recipient')
        
        #ERROR CHECKING
        if not PetPalUser.objects.filter(username=recipient_username).exists():
            raise Http404("User not Found")
        recipient = PetPalUser.objects.get(username=recipient_username)
        if sender.is_shelter == recipient.is_shelter:
            raise ValidationError("Cannot send message to this kind of account")
        
        message = Message.objects.create(sender=sender, recipient=recipient, **validated_data)
        return message
    
class FullSerializer(ModelSerializer):
    sender = ReadOnlyField(source='sender.username')
    recipient = serializers.CharField()

    class Meta:
        model = Message
        fields = ['recipient', 'sender', 'content', 'timestamp']