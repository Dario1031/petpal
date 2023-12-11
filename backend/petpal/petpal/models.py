# from django.db import models
# from django.contrib.auth.models import AbstractUser, AbstractBaseUser
# from django.db.models.fields.related import ForeignKey

# class PetSeeker(AbstractBaseUser):
#     profile_img = models.ImageField(upload_to='profile_img', blank=True)
#     description = models.TextField(max_length=500, blank=True)

# class Shelter(PetSeeker):
#     company = models.CharField(max_length=255)
#     address = models.CharField(max_length=255)
#     city = models.CharField(max_length=255)
#     province = models.CharField(max_length=255)
#     country = models.CharField(max_length=255)
#     description = models.TextField(max_length=500, blank=True)
#     phone_number = models.CharField(max_length=10)
#     website = models.URLField(max_length=255, blank=True)
#     instagram = models.URLField(max_length=255, blank=True)
#     twitter = models.URLField(max_length=255, blank=True)
#     facebook = models.URLField(max_length=255, blank=True)

# class Pet(models.Model):
#     species = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     age = models.IntegerField()
#     breed = models.CharField(max_length=255)
#     image = models.ImageField(upload_to='pet_img', blank=True)
#     shelter = ForeignKey(Shelter, on_delete=models.CASCADE)

# class Application(models.Model):
#     user_id = ForeignKey(PetSeeker, on_delete=models.CASCADE)
#     pet_id = ForeignKey(Pet, on_delete=models.CASCADE)
#     status = models.CharField(max_length=255)
#     description = models.TextField(max_length=500, blank=True)
#     legal_document = models.ImageField(upload_to='legal_document', blank=True)

# class Review(models.Model):
#     user_id = ForeignKey(PetSeeker, on_delete=models.CASCADE)
#     shelter_id = ForeignKey(Shelter, on_delete=models.CASCADE)
#     rating = models.IntegerField()
#     description = models.TextField(max_length=500, blank=True)

# class Message(models.model):