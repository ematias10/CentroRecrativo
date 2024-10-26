from django.db import models

# Create your models here.

class TipoCliente(models.Model):
    nombre=models.CharField(max_length=50)
    codigo=models.CharField(max_length=5)
    descuento=models.IntegerField()#valor en porcentaje

class Cliente(models.Model):    
    rut=models.CharField(max_length=10)
    nombres = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    telefono = models.IntegerField()
    email = models.EmailField()
    tipo_cliente = models.ForeignKey(TipoCliente, on_delete=models.CASCADE)

class TipoServicio(models.Model):
    nombre = models.CharField(max_length=100)
    capacidad = models.IntegerField()
    descripcion = models.TextField()
    precio = models.IntegerField()

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo_servicio = models.ForeignKey(TipoServicio, on_delete=models.CASCADE)
    
class Reserva(models.Model):
    ESTADO_CHOICES = [('PC','Por confirmar'),
                      ('OK','Confirmada'),
                      ('EU','En uso'),
                      ('F','Finalizada'),
                      ]
    fecha_reserva = models.DateTimeField(auto_now=True)
    estado = models.CharField(max_length=30, choices=ESTADO_CHOICES)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

class DetalleReserva(models.Model):
    reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    fecha_inicio = models.DateTimeField()
    fecha_termino = models.DateTimeField()
    cantidad_personas = models.IntegerField()

class TipoPago(models.Model):
    nombre=models.CharField(max_length=50)
    codigo=models.CharField(max_length=5)

class Pago(models.Model):
    total = models.IntegerField()
    fecha_pago = models.DateTimeField
    detalle = models.CharField(max_length=400)
    codigo_boleta = models.CharField(max_length=100)
    reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE)
    tipo_pago = models.ForeignKey(TipoPago, on_delete=models.CASCADE)

