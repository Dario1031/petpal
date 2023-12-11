from rest_framework.serializers import ModelSerializer
from .models import Application
from accounts.models import PetPalUser
from pets.models import Pet

# class PetSeekerSerializer(ModelSerializer):
#     class Meta:
#         model = PetPalUser
#         fields = ['id', 'is_shelter']

class ApplicationSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'user_id', 'pet_id', 'status', 'description', 'legal_document']