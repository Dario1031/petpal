from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import Review
from rest_framework import serializers
from accounts.models import PetPalUser
from django.db import models
from django.http import Http404

class ReviewSerializer(ModelSerializer):
    # sender = ReadOnlyField(source='sender.username')
    reviewer = serializers.ReadOnlyField(source='reviewer.username')
    shelter = serializers.CharField()

    class Meta:
        model = Review
        fields = ['shelter', 'reviewer', 'content', 'rating', 'is_anon', 'timestamp']

    def create(self, validated_data):
        reviewer = self.context['request'].user
        rating = validated_data.pop('rating')
        shelter_username = validated_data.pop('shelter')
        
        #ERROR CHECKING
        if not PetPalUser.objects.filter(username=shelter_username).exists():
            raise Http404("User not Found")
        shelter = PetPalUser.objects.get(username=shelter_username)
        
        review = Review.objects.create(reviewer=reviewer, shelter=shelter, rating=rating, **validated_data)
        return review
    
# class ReviewBasicSerializer(ModelSerializer):
#     class Meta:
#         model = Review
#         fields = ['shelter', 'reviewer', 'content', 'rating', 'is_anon', 'timestamp']

#     def create(self, validated_data):
#         reviewer = self.context['request'].user
#         reviewer_username = validated_data.pop('reviewer')
#         rating = validated_data.pop('rating')
#         shelter = validated_data.pop('shelter')
#         if not PetPalUser.objects.filter(username=reviewer_username).exists():
#             raise Http404("User not Found")
#         reviewer_final = PetPalUser.objects.get(username=reviewer_username)

#         review = Review.objects.create(reviewer=reviewer_final, shelter=shelter, rating=rating, **validated_data)
#         return review

class ReviewBasicSerializer(ModelSerializer):
    reviewer_username = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['shelter', 'reviewer', 'reviewer_username', 'content', 'rating', 'is_anon', 'timestamp']

    def get_reviewer_username(self, obj):
        return obj.reviewer.username

    def create(self, validated_data):
        reviewer = self.context['request'].user
        reviewer_username = validated_data.pop('reviewer')
        rating = validated_data.pop('rating')
        shelter = validated_data.pop('shelter')
        if not PetPalUser.objects.filter(username=reviewer_username).exists():
            raise Http404("User not Found")
        reviewer_final = PetPalUser.objects.get(username=reviewer_username)

        review = Review.objects.create(reviewer=reviewer_final, shelter=shelter, rating=rating, **validated_data)
        return review
