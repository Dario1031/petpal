from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields.related import ForeignKey
from django.utils import timezone
import django

class Application(models.Model):
    user_id = ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE)
    pet_id = ForeignKey('pets.Pet', on_delete=models.CASCADE)
    status = models.CharField(max_length=255)
    description = models.TextField(max_length=500, blank=True)
    legal_document = models.ImageField(upload_to='legal_document', blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super(Application, self).save(*args, **kwargs)
