from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


class User(AbstractUser):
    avatar = models.ImageField(upload_to='users/%Y/%m', null=True)


class Models(models.Model):
    class Meta:
        abstract = True

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)


class CarName(Models):
    carName = models.CharField(max_length=255, unique=True)
    image = models.ImageField(upload_to="carname/%Y/%m", null=True, blank=True)

    def __str__(self):
        return self.carName


class TripName(Models):
    tripName = models.CharField(max_length=255, unique=True)
    start = models.CharField(max_length=255)
    end = models.CharField(max_length=255)
    carName = models.ForeignKey(CarName, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.tripName


class CarPassenger(Models):
    number = models.CharField(max_length=255, unique=True)
    startDate = models.CharField(max_length=100)
    tripName = models.ForeignKey(TripName, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to="carpassenger/%Y/%m", null=True, blank=True)
    description = RichTextField()
    seats = models.ManyToManyField('Seats')

    def __str__(self):
        return self.number


class CargoVehicles(Models):
    number = models.CharField(max_length=255, unique=True)
    startDate = models.CharField(max_length=100)
    tripName = models.ForeignKey(TripName, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to="cargovehicles/%Y/%m", null=True, blank=True)
    description = RichTextField()
    seats = models.ManyToManyField('Seats')
    weight = models.ManyToManyField('Weight')

    def __str__(self):
        return self.number


class Seats(Models):
    number = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.number


class Weight(Models):
    weight = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.weight





