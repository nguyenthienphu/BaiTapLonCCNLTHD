from django.urls import path, include
from rest_framework import routers
from . import views

r = routers.DefaultRouter()
r.register('CarName', views.CarNameViewSet, basename='CarName')
r.register('TripName', views.TripNameViewSet, basename='TripName')
r.register('CarPassenger', views.CarPassengerViewSet, basename='CarPassenger')
r.register('CargoVehicles', views.CargoVehiclesViewSet, basename='CargoVehicles')
r.register('Seats', views.SeatsViewSet, basename='Seats')
r.register('Weight', views.WeightViewSet, basename='Weight')
r.register('User', views.UserViewSet, basename='User')

urlpatterns = [
    path('', include(r.urls)),
]