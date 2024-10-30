
from django.urls import include, path

from . import views

from . import cart



urlpatterns = [
    #Manejo Carrito
    path("cart/agregar-al-carrito/", cart.agregarAlCarrito, name="carritoAgregar"),
    path("cart/ver-carrito/", cart.verCarrito, name="carritoVer"),
    path("cart/eliminar-del-carrito/<int:servicio_id>/", cart.eliminarDelCarrito, name="carritoEliminar"),
    ####
    path("home/", views.home, name="home"),
    path("reserva/",views.reserva,name="reserva"),
    ]