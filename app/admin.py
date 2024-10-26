from django.contrib import admin

from app.models import *
# Register your models here.

@admin.register(TipoCliente)
class TipoClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre','codigo','descuento')
    search_fields = ['nombre','codigo']

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('rut','nombres','apellidos','telefono','email','tipo_cliente')
    search_fields = ['rut','nombres','apellidos','telefono']

@admin.register(TipoServicio)
class TipoServicioAdmin(admin.ModelAdmin):
    list_display=('nombre','capacidad','precio')
    search_fields=['nombre','capacidad']

@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display=('nombre','descripcion','tipo_servicio')
    search_fields=['nombre','tipo_serivicio']

@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ('id','cliente','estado','fecha_reserva')
    search_fields = ['cliente','estado','fecha_reserva']

@admin.register(DetalleReserva)
class DetalleReservaAdmin(admin.ModelAdmin):
    list_display = ('reserva','servicio','fecha_inicio','fecha_termino','cantidad_personas')
    search_fields = ['reserva','servicio','fecha_inicio','fecha_termino','cantidad_personas']

@admin.register(TipoPago)
class TipoPagoAdmin(admin.ModelAdmin):
    list_display = ('nombre','codigo')
    search_fields = ['nombre','codigo']

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ('reserva','total','tipo_pago','estado')
    search_fields = ['reserva','total','tipo_pago','estado'] 