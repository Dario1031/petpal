from rest_framework.serializers import ModelSerializer
from .models import PetPalUser
from rest_framework import serializers

class PetSeekerSerializer(ModelSerializer):
    class Meta:
        model = PetPalUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'profile_img', 'description']

class PetSeekerSignUpSerializer(ModelSerializer):
    class Meta:
        model = PetPalUser
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email', 'profile_img', 'description']

class ShelterSerializer(ModelSerializer):
    class Meta:
        model = PetPalUser
        fields = ['id', 'username', 'email', 'profile_img', 'company', 'address', 'city', 'province', 'country', 'description', 'phone_number', 'website', 'instagram', 'twitter', 'facebook']

class ShelterSignUpSerializer(ModelSerializer):
    class Meta:
        model = PetPalUser
        fields = ['id', 'username', 'password', 'email', 'profile_img', 'company', 'address', 'city', 'province', 'country', 'description', 'phone_number', 'website', 'instagram', 'twitter', 'facebook']

class LoginSerializer(ModelSerializer):
    class Meta:
        model = PetPalUser
        fields = ['username', 'password']

class FullIsShelterSerializer(ModelSerializer):
    class Meta:
        model = PetPalUser
        fields = ['id', 'is_shelter', 'username', 'password', 'email', 'profile_img', 'company', 'address', 'city', 'province', 'country', 'description', 'phone_number', 'website', 'instagram', 'twitter', 'facebook']

class PetPalUserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetPalUser
        fields = [
            'username',
            'password',
            'email',
            'profile_img',
            'first_name',
            'last_name',
            'company',
            'address',
            'city',
            'province',
            'country',
            'description',
            'phone',
            'website',
            'instagram',
            'twitter',
            'facebook',
            'is_shelter',
        ]
    username = serializers.CharField(max_length=150, required=False)
    password = serializers.CharField(write_only=True, required=False)
    email = serializers.EmailField(required=False)
    profile_img = serializers.ImageField(required=False)
    company = serializers.CharField(max_length=255, required=False)
    address = serializers.CharField(max_length=255, required=False)
    city = serializers.CharField(max_length=255, required=False)
    province = serializers.CharField(max_length=255, required=False)
    country = serializers.CharField(max_length=255, required=False)
    description = serializers.CharField(max_length=500, required=False)
    phone = serializers.CharField(max_length=10, required=False)
    website = serializers.URLField(max_length=255, required=False)
    instagram = serializers.URLField(max_length=255, required=False)
    twitter = serializers.URLField(max_length=255, required=False)
    facebook = serializers.URLField(max_length=255, required=False)
    is_shelter = serializers.BooleanField(required=False)
