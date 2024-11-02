from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets, permissions
from .views import *

#API versioning

router = routers.DefaultRouter()
router.register(r'clientes',ListaClientes, 'clientes')
router.register(r'servicios',ListaServicios, 'serivicios')

urlpatterns = [
    path('v1/',include(router.urls)),
    path('v1/servicios-disponibles/', ServiciosDisponiblesView.as_view(), name='servicios-disponibles'),
    # path('ListaClientes/',ListaClientesView.as_view(),name='ListaDeClientes'),
    # path('datoscliente/<str:rut>/',DatosClienteView.as_view(),name='datosdeclienteporrut')
    ]