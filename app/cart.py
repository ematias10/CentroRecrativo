from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from datetime import date, datetime

def diasEntreFechas(fecha1, fecha2):
    fecha1 = datetime.strptime(fecha1, "%Y-%m-%d")
    fecha2 = datetime.strptime(fecha2, "%Y-%m-%d")
    return abs((fecha2 - fecha1).days)

def obtenerCarrito(request):
    carrito = request.session.get('carrito',{})
    return carrito

def guardarCarrito(request, carrito):
    request.session['carrito'] = carrito
    request.session.modified = True

def agregarAlCarrito(request):
    if request.method == "POST":
        data = json.loads(request.body)

        servicio_id = data.get('servicio_id')
        fecha_inicio = data.get('fecha_inicio')
        fecha_fin = data.get('fecha_fin')
        cantidad_personas = data.get('cantidad_personas')

        carrito = obtenerCarrito(request)

        carrito[servicio_id] = {
            'fecha_inicio': fecha_inicio,
            'fecha_fin': fecha_fin,
            'cantidad_personas': cantidad_personas,
            'dias':diasEntreFechas(fecha_fin, fecha_inicio),
        }

        guardarCarrito(request, carrito)

        return JsonResponse({"message":"Se agrego el servicio al carrito"})
    
    else:
        return JsonResponse({"message":"Metodo no permitido"}, status=405)
    
def verCarrito(request):
    carrito = obtenerCarrito(request)
    return JsonResponse(carrito)

def eliminarDelCarrito(request, servicio_id):
    
    carrito = obtenerCarrito(request)

    if str(servicio_id) in carrito:
        
        del carrito[str(servicio_id)]
    
    guardarCarrito(request, carrito)
    
    return JsonResponse({"message": "Cabaña eliminada del carrito"})
