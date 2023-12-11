from django.db import models
from accounts.models import PetPalUser
from django.db.models.fields.related import ForeignKey

# Create your models here.

class Message(models.Model):
    sender = models.ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE, related_name="message_sender")
    recipient = models.ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE, related_name="message_recipient")
    content = models.TextField(max_length=500, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)