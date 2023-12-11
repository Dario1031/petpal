from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from django.shortcuts import get_object_or_404, redirect
from .models import Message
from .serializers import MessageSerializer, FullSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from accounts.models import PetPalUser
from django.http import Http404
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone

# Create your views here.

class MessagePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class SendMessage(CreateAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def perform_create(self, serializer):
        serializer.save()
        return Response({"message": "Message created successfully"}, status=status.HTTP_201_CREATED)

class MessageList(ListAPIView):
    serializer_class = MessageSerializer
    pagination_class = MessagePagination
    def get_queryset(self):
        sender = self.request.user
        recipient_username = self.kwargs.get('username')
        if not PetPalUser.objects.filter(username=recipient_username).exists():
            raise Http404("User not Found")
        recipient = PetPalUser.objects.get(username=recipient_username)

        qs1 = Message.objects.filter(sender=sender, recipient=recipient)
        qs2 = Message.objects.filter(sender=recipient, recipient=sender)
        queryset = qs1 | qs2

        return queryset.order_by('-timestamp')
    
class RecentMessagesView(ListAPIView):
    model = Message
    # template_name = 'recent_messages.html'
    # context_object_name = 'recent_messages'
    serializer_class = MessageSerializer

    def get_queryset(self):
        # Calculate the datetime 3 minutes ago
        three_minutes_ago = timezone.now() - timezone.timedelta(minutes=3)
        recipient_username = self.kwargs.get('username')
        rec=self.request.user
        # serializer_class=FullSerializer

        # Retrieve messages sent in the last 3 minutes
        return Message.objects.filter(recipient=recipient_username)