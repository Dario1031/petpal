from django.shortcuts import render
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

from .serializers import PetCreateSerializer
from .models import Pet

# Create your views here.
class CreatePetView(CreateAPIView):
    serializer_class = PetCreateSerializer
    queryset = Pet.objects.all()

    def create(self, request, *args, **kwargs):
        if request.user.is_shelter:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(shelter=request.user)
            headers = self.get_success_headers(serializer.data)
            return Response({"message": "Pet created successfully"}, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({"message": "Only shelters can create pet listings"}, status=status.HTTP_403_FORBIDDEN)

class UpdatePetView(UpdateAPIView):
    serializer_class = PetCreateSerializer
    queryset = Pet.objects.all()
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        if request.user.is_shelter:
            return super().update(request, *args, **kwargs)
        else:
            return Response({"message": "Only shelters can update pet listings"}, status=status.HTTP_403_FORBIDDEN)

class GetPetView(RetrieveAPIView):
    serializer_class = PetCreateSerializer
    queryset = Pet.objects.all()
    lookup_field = 'id'

class DeletePetView(DestroyAPIView):
    serializer_class = PetCreateSerializer
    queryset = Pet.objects.all()
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.is_shelter:
            self.perform_destroy(instance)
            return Response({"message": "Pet deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "Only shelters can delete pet listings"}, status=status.HTTP_403_FORBIDDEN)

class NewPagination(PageNumberPagination):
    page_size = 6

class SearchAndFilterPetsView(ListAPIView):
    serializer_class = PetCreateSerializer
    queryset = Pet.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['age', 'name']
    search_fields = ['name', 'species', 'breed', 'is_adopted', 'age', 'gender', 'bio']
    filterset_fields = ['shelter', 'is_adopted', 'species', 'breed']
    pagination_class = NewPagination