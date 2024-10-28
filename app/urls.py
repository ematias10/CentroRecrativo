
from django.urls import include, path

from . import views



urlpatterns = [
    path("home/", views.home, name="home"),
    path("reserva/",views.reserva,name="reserva")
    ]