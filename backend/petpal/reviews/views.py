from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from django.shortcuts import get_object_or_404, redirect
from .models import Review
from .serializers import ReviewSerializer, ReviewBasicSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from accounts.models import PetPalUser
from django.http import Http404
from rest_framework.pagination import PageNumberPagination

# Create your views here.

class ReviewPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class CreateReview(CreateAPIView):
    # serializer_class = ReviewSerializer
    serializer_class = ReviewBasicSerializer
    queryset = Review.objects.all()

    def perform_create(self, serializer):
        serializer.save()
        return Response({"message": "Review created successfully"}, status=status.HTTP_201_CREATED)

class ReviewList(ListAPIView):
    serializer_class = ReviewBasicSerializer
    pagination_class = ReviewPagination
    def get_queryset(self):
        reviewer = self.request.user
        shelter_username = self.kwargs.get('username')
        if not PetPalUser.objects.filter(username=shelter_username).exists():
            raise Http404("User not Found")
        shelter = PetPalUser.objects.get(username=shelter_username)

        queryset = Review.objects.filter(reviewer=reviewer, shelter=shelter)

        return queryset.order_by('-timestamp')
    
class ReviewIdList(ListAPIView):
    serializer_class = ReviewBasicSerializer
    pagination_class = ReviewPagination
    def get_queryset(self):
        reviewer = self.request.user
        shelter_id = self.kwargs.get('userid')
        if not PetPalUser.objects.filter(id=shelter_id).exists():
            raise Http404("User not Found")
        shelter = PetPalUser.objects.get(id=shelter_id)

        queryset = Review.objects.filter(reviewer=reviewer, shelter=shelter)

        return queryset.order_by('-timestamp')
