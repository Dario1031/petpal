from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status, filters
from django.shortcuts import get_object_or_404, redirect
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from rest_framework.exceptions import ValidationError

from .models import Application
from accounts.models import PetPalUser
from pets.models import Pet
from .serializers import ApplicationSerializer


class CreateApplicationView(CreateAPIView):
    serializer_class = ApplicationSerializer
    queryset = Pet.objects.filter(is_adopted = False)
    def create(self, request, *args, **kwargs):
        if request.user.is_shelter == False:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user_id = request.user, status = "pending")
            headers = self.get_success_headers(serializer.data)
            return Response({"message": "Application created successfully"}, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({"message": "Only Petseekers can apply for applications"}, status=status.HTTP_403_FORBIDDEN)



class ApplicationView(ListAPIView):
    serializer_class = ApplicationSerializer
    # queryset = Application.objects.all()
    # lookup_field = 'id'

    def get_queryset(self):
        if self.request.user.is_shelter == False:
            applications = Application.objects.filter(user_id = self.request.user)
            return applications
        else:
            raise ValidationError("Shelters do not have their own applications to view")

class UpdateApplicationPetSeekerView(UpdateAPIView):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.filter(Q(status = "pending") | Q(status = "accepted"))
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        if request.user.is_shelter == False:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            specific_attribute_value = request.data.get('status', instance.status)
            instance.status = specific_attribute_value

            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        else:
            return Response({"message": "Shelters cannot withdraw an application"}, status=status.HTTP_403_FORBIDDEN)

class UpdateApplicationShelterView(UpdateAPIView):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.filter(status = "pending")
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        if request.user.is_shelter:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            specific_attribute_value = request.data.get('status', instance.status)
            instance.status = specific_attribute_value

            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        else:
            return Response({"message": "Petseekers cannot accept or reject a pending application"}, status=status.HTTP_403_FORBIDDEN)
    
class SearchAndFilterApplicationView(ListAPIView):
    serializer_class = ApplicationSerializer
    # queryset = Application.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['creationtime', 'lastupdatetime']
    filterset_fields = ['status']
    pagination_class = PageNumberPagination
    pagination_class.page_size = 5

    def get_queryset(self):
        if self.request.user.is_shelter:
            pets = Pet.objects.filter(shelter = self.request.user)
            applications = Application.objects.filter(pet_id__in=pets)
            return applications
        else: 
            raise ValidationError("Petseekers cannot see other people's application")