from rest_framework import fields, serializers
from django.contrib.auth.models import User
from agenda.models import Evento

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')
        read_only_fields = ('id',)
        #write_only_fields = ('password',)

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('descricao', 'inicio', 'fim')