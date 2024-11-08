from django.shortcuts import render
from .models import *
# Create your views here.


def home(request):
    context = {}
    return render(request, "app/home.html",context)

def reserva(request):
    usuarios = Cliente.objects.all()
    reservas = Reserva.objects.all()
    context = {'clientes': usuarios,
               'reservas': reservas,
               }

    return render(request, "app/new_reserva.html", context)


def confirmar_reserva(request):
    context = {}
    return render(request,"app/confirmar_reserva.html", context)