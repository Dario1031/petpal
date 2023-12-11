from django.db import models

# Create your models here.

class Notification(models.Model):
    sender = models.ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey('accounts.PetPalUser', on_delete=models.CASCADE, related_name='receiver')
    target = models.URLField(max_length=255)
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    content_type = models.CharField(max_length=20, default='default')
    content_id = models.IntegerField(default=-1)