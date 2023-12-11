from django.db import models
from accounts.models import PetPalUser
from django.db.models.fields.related import ForeignKey
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Review(models.Model):
    reviewer = ForeignKey(PetPalUser, on_delete=models.CASCADE, related_name="shelter_reviewer")
    shelter = ForeignKey(PetPalUser, on_delete=models.CASCADE, related_name="shelter")
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    content = models.TextField(max_length=500, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_anon = models.BooleanField(default=False)