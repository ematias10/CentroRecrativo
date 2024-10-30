from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


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
            'cantidad_personas': cantidad_personas
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
    if servicio_id in carrito:
        del carrito[servicio_id]
    
    guardarCarrito(request, carrito)
    
    return JsonResponse({"message": "Cabaña eliminada del carrito"})
