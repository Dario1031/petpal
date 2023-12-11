from django.db import models
from accounts.models import PetPalUser


# Create your models here.

class Pet(models.Model):
    name = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    gender = models.CharField(max_length=255, blank=True)
    breed = models.CharField(max_length=255)
    age = models.IntegerField()
    image = models.ImageField(upload_to='pet_img', blank=True)
    shelter = models.ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE, related_name='pets')
    is_adopted = models.BooleanField(default=False)
    bio = models.TextField(blank=True)
