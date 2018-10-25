from django.conf.urls import url, include
from rest_framework import routers
from agenda import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'evento', views.EventoViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls))
]