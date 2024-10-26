from django.db import models

# Create your models here.

class TipoCliente(models.Model):
    nombre=models.CharField(max_length=50)
    codigo=models.CharField(max_length=5)
    descuento=models.IntegerField()#valor en porcentaje

    def __str__(self):
        return self.codigo

class Cliente(models.Model):    
    rut=models.CharField(max_length=10)
    nombres = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    telefono = models.IntegerField()
    email = models.EmailField()
    tipo_cliente = models.ForeignKey(TipoCliente, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombres} {self.apellidos} ({self.rut}) ({self.tipo_cliente})"

class TipoServicio(models.Model):
    nombre = models.CharField(max_length=100)
    capacidad = models.IntegerField()
    descripcion = models.TextField()
    precio = models.IntegerField()

    def __str__(self):
        return f"{self.nombre} ({self.capacidad})"
    

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo_servicio = models.ForeignKey(TipoServicio, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.nombre} ({self.tipo_servicio.nombre})"

class Reserva(models.Model):
    ESTADO_CHOICES = [('PC','Por confirmar'),
                      ('OK','Confirmada'),
                      ('EU','En uso'),
                      ('F','Finalizada'),
                      ]
    fecha_reserva = models.DateTimeField(auto_now=True)
    estado = models.CharField(max_length=30, choices=ESTADO_CHOICES)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.cliente.rut} ({self.estado})"

class DetalleReserva(models.Model):
    reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    fecha_inicio = models.DateTimeField()
    fecha_termino = models.DateTimeField()
    cantidad_personas = models.IntegerField()

    def __str__(self):
        return f"{self.reserva} ({self.fecha_inicio} - {self.fecha_termino})"

class TipoPago(models.Model):
    nombre=models.CharField(max_length=50)
    codigo=models.CharField(max_length=5)

    def __str__(self):
        return f"{self.nombre} ({self.codigo})"


class Pago(models.Model):
    ESTADO_CHOICES = [('PP','Pago Pendiente'),
                      ('AB','Abonado'),
                      ('POK','Pagado'),
                      ]
    total = models.IntegerField()
    fecha_pago = models.DateTimeField(null=True, blank=True)
    detalle = models.CharField(max_length=400)
    codigo_boleta = models.CharField(max_length=100)
    reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE)
    tipo_pago = models.ForeignKey(TipoPago, on_delete=models.CASCADE)
    estado = models.CharField(max_length=30, choices=ESTADO_CHOICES, default='PP')

    def __str__(self):
        return f"{self.reserva} ({self.estado})"
