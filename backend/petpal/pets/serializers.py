from rest_framework.serializers import ModelSerializer
from accounts.models import PetPalUser
from pets.models import Pet

class PetCreateSerializer(ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'