from django.db import models
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.db.models.fields.related import ForeignKey

class PetPalUser(AbstractUser):
    profile_img = models.ImageField(upload_to='profile_img', blank=True)
    company = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, blank=True)
    phone_number = models.CharField(max_length=10)
    website = models.URLField(max_length=255, blank=True)
    instagram = models.URLField(max_length=255, blank=True)
    twitter = models.URLField(max_length=255, blank=True)
    facebook = models.URLField(max_length=255, blank=True)
    is_shelter = models.BooleanField(default=True)