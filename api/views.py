from django.shortcuts import render
from .serializers import *
from app.models import *
from datetime import date, datetime

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group

from django.http import JsonResponse
import json

from django.db.models import Q

from rest_framework import authentication, generics, permissions, views, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response


class ListaClientes(viewsets.ModelViewSet):
    serializer_class = ListaClientesSerializer
    queryset = Cliente.objects.all()
    lookup_field = 'rut'


class ListaClientesView(generics.ListAPIView):
    serializer_class = ListaClientesSerializer
    queryset = Cliente.objects.all()



class DatosClienteView(generics.ListAPIView):
    serializer_class = ListaClientesSerializer

    def get_queryset(self):
        rut = self.kwargs.get('rut')
        return Cliente.objects.filter(rut=rut)

class ServiciosDisponiblesView(APIView):
    def get(self, request):
        # Obtener parámetros de fecha de la solicitud
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')

        # Validar que las fechas estén presentes y en formato correcto
        if not fecha_inicio or not fecha_fin:
            return Response({"error": "Se requieren los parámetros 'fecha_inicio' y 'fecha_fin'."},
                            status=status.HTTP_400_BAD_REQUEST)
        
        try:
            fecha_inicio = datetime.strptime(fecha_inicio, '%Y-%m-%d').replace(hour=15, minute=0, second=0)
            fecha_fin = datetime.strptime(fecha_fin, '%Y-%m-%d').replace(hour=12, minute=0, second=0)
            print(fecha_fin)
        except ValueError:
            return Response({"error": "Formato de fecha inválido. Use 'YYYY-MM-DD'."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Filtrar servicios ocupados excluyendo aquellos que terminan exactamente en la fecha_inicio solicitada
        servicios_ocupados = DetalleReserva.objects.filter(
            Q(reserva__fecha_inicio__lt=fecha_fin) & Q(reserva__fecha_termino__gt=fecha_inicio)
        ).values_list('servicio', flat=True)
        
        # Excluir los servicios ocupados
        servicios_disponibles = Servicio.objects.exclude(id__in=servicios_ocupados)

        # Serializar y devolver los servicios disponibles
        serializer = ServicioSerializer(servicios_disponibles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)