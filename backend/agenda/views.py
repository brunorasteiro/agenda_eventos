from rest_framework import viewsets
from django.contrib.auth.models import User
from agenda.models import Evento
from agenda.serializers import *

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer

class EventoViewSet(viewsets.ModelViewSet):
	queryset = Evento.objects.all()
	serializer_class = EventoSerializer

		
	def perform_create(self, serializer):
		import dateutil.parser
		from django.db.models import Q
		from rest_framework.exceptions import APIException

		owner_id = self.request.user.id
		ini = dateutil.parser.parse(self.request.data['inicio'])
		fim = dateutil.parser.parse(self.request.data['fim'])

		
		events = Evento.objects.filter( Q(owner=owner_id),
										Q(inicio__lte=ini, fim__gt=ini) | 
										Q(inicio__lt=fim,  fim__gte=fim) |
										Q(inicio__gte=ini, fim__lte=fim))
		if events.count() > 0:
			raise APIException(detail='Sobreposição de horário.', code='400')			
		else:
			serializer.save(owner=self.request.user)

	def perform_update(self, serializer):
		import dateutil.parser
		from django.db.models import Q
		from rest_framework.exceptions import APIException

		owner_id = self.request.user.id
		ini = dateutil.parser.parse(self.request.data['inicio'])
		fim = dateutil.parser.parse(self.request.data['fim'])

		
		events = Evento.objects.filter( Q(owner=owner_id),
										Q(inicio__lte=ini, fim__gt=ini) | 
										Q(inicio__lt=fim,  fim__gte=fim) |
										Q(inicio__gte=ini, fim__lte=fim))
		if events.count() > 0:
			raise APIException(detail='Sobreposição de horário.', code='400')			
		else:
			serializer.save(owner=self.request.user)