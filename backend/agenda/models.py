from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.
class Evento(models.Model):
	descricao = models.CharField(max_length=100)
	owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='evento')
	inicio = models.DateTimeField()
	fim = models.DateTimeField()

	class Meta:
		unique_together = ('owner', 'inicio', 'fim',)

# This receiver handles token creation immediately a new user is created.
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)