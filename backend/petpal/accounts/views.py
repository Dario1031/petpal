from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView, DestroyAPIView, ListAPIView
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404, redirect
from .models import PetPalUser
from .serializers import PetSeekerSerializer, PetSeekerSignUpSerializer, ShelterSerializer, ShelterSignUpSerializer, LoginSerializer, FullIsShelterSerializer, PetPalUserEditSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from django.http import JsonResponse, HttpResponse
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.exceptions import PermissionDenied
from applications.models import Application
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.hashers import make_password


class ActiveUserView(RetrieveAPIView):
    def get_serializer_class(self):
        # user = self.request.user

        # if user.is_shelter:
        #     return ShelterSerializer
        # else:
        #     access_user = self.request.user
        #     if access_user != user:
        #         raise PermissionDenied("You don't have permission to access this resource.")
        #     return PetSeekerSerializer
        return FullIsShelterSerializer
    def get_object(self):
        return self.request.user

class AccountProfileView(RetrieveAPIView):
    def get_serializer_class(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(PetPalUser, id=user_id)

        if user.is_shelter:
            return ShelterSerializer
        else:
            access_user = self.request.user
            if access_user != user:
                raise PermissionDenied("You don't have permission to access this resource.")
            return PetSeekerSerializer
    def get_object(self):
        user_id = self.kwargs.get('user_id')
        return get_object_or_404(PetPalUser, id=user_id)

class CreateShelterAccountView(CreateAPIView):
    serializer_class = ShelterSignUpSerializer
    queryset = PetPalUser.objects.all()

    permission_classes = [AllowAny]  # Allow any user, authenticated or not

    def perform_create(self, serializer):
        data = serializer.validated_data

        user = get_user_model().objects.create_user(**data)
        user.save()
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

    # def perform_create(self, serializer):
    #     user = serializer.save(is_shelter=True)
    #     return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    
class CreatePetSeekerAccountView(CreateAPIView):
    serializer_class = PetSeekerSignUpSerializer
    queryset = PetPalUser.objects.all()

    permission_classes = [AllowAny]  # Allow any user, authenticated or not

    def perform_create(self, serializer):
        data = serializer.validated_data
        data['is_shelter'] = False

        user = get_user_model().objects.create_user(**data)
        user.save()
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

    # def perform_create(self, serializer):
    #     user = serializer.save(is_shelter=False)
    #     return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    
class ListShelterView(ListAPIView):
    permission_classes = [AllowAny]  # Allow any user, authenticated or not
    serializer_class = ShelterSerializer
    queryset = PetPalUser.objects.filter(is_shelter=True)

class ListShelterPageView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShelterSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 5
    queryset = PetPalUser.objects.filter(is_shelter=True)

class ListBothView(ListAPIView):
    def get_serializer_class(self):
        user = self.request.user

        if user.is_shelter:
            return PetSeekerSerializer
        else:
            return ShelterSerializer
    def get_queryset(self):
        if self.request.user.is_authenticated:
            if self.request.user.is_shelter:
                # Retrieve non-shelter users
                return PetPalUser.objects.filter(is_shelter=False)
            else:
                # Retrieve shelter users
                return PetPalUser.objects.filter(is_shelter=True)
        else:
            # If user is not authenticated, handle it accordingly
            return PetPalUser.objects.none()

# class LoginView(APIView):
#     serializer_class = LoginSerializer

#     def post(self, request, *args, **kwargs):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(username=username, password=password)

#         if user:
#             token, created = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key}, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UpdateAccountView(UpdateAPIView):
    queryset = PetPalUser.objects.all()
    serializer_class = PetPalUserEditSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        if 'password' in self.request.data:
            # Hash the password before saving it
            serializer.validated_data['password'] = make_password(self.request.data['password'])
        serializer.save()