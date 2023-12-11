from django.shortcuts import render
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from .models import Notification
from .serializers import NotificationSerializer

# Create your views here.

class CreateNotificationView(CreateAPIView):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()

    def perform_create(self, serializer):
        data = serializer.validated_data
        sender_username = data["sender"].username
        user_id = self.request.user.id

        if data['content_type'] == 'message':
            data['target'] = f'/messages/{sender_username}/'
            serializer.save(sender=self.request.user)
        elif data['content_type'] == 'review':
            data['target'] = f'/reviews/{sender_username}/list/'
            serializer.save(sender=self.request.user)
        elif data['content_type'] == 'application':
            if self.request.user.is_shelter:
                data['target'] = f'/applications/{user_id}/shelter/list/'
                serializer.save(sender=self.request.user)
            else:
                data['target'] = f'/applications/{user_id}/petseeker/list/'
                serializer.save(sender=self.request.user)

class UpdateNotificationView(UpdateAPIView):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    lookup_field = 'id'

    def perform_update(self, serializer):
        data = serializer.validated_data
        data['is_read'] = True
        serializer.save(sender=self.request.user, is_read=True)

class GetNotificationView(RetrieveAPIView):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    lookup_field = 'id'

class ListNotificationView(ListAPIView):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['timestamp']
    filterset_fields = ['is_read']
    pagination_class = PageNumberPagination
    pagination_class.page_size = 5

    def get_queryset(self):
        return Notification.objects.filter(receiver=self.request.user)

