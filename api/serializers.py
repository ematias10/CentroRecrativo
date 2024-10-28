from django.contrib.auth.models import User, Group
from app.models import *
from rest_framework import serializers
from django.conf import settings
import json
from django.core.files import File
import base64
from django import core

class TpoClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCliente
        fields = ['codigo','nombre','descuento']

class ListaClientesSerializer(serializers.ModelSerializer):
    #para mostrar el objeto completo con sus datos con GET
    tipo_cliente = TpoClienteSerializer(read_only = True)
    #recibir el id en caso de POST
    tipo_cliente_codigo = serializers.SlugRelatedField(queryset=TipoCliente.objects.all(),
                                                         slug_field='codigo',  # Usar 'codigo' como el identificador en lugar de 'id'
                                                         source = 'tipo_cliente',
                                                         write_only = True)
    class Meta:
        model = Cliente
        # fields = ['rut','nombres','apellidos','telefono','email','tipo_cliente']'
        fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'