from django.contrib import admin
from .models import CarName, TripName, CarPassenger, CargoVehicles, Seats, Weight


class CarNameAdmin(admin.ModelAdmin):
    list_display = ['id', 'carName', 'created_date', 'updated_date']
    list_filter = ['carName', 'created_date']
    search_fields = ['carName']


class TripNameAdmin(admin.ModelAdmin):
    list_display = ['id', 'tripName', 'start', 'end', 'created_date', 'updated_date', 'carName_id']
    list_filter = ['tripName', 'created_date']
    search_fields = ['tripName', 'start', 'end']


class CarPassengerAdmin(admin.ModelAdmin):
    list_display = ['id', 'number', 'startDate', 'created_date', 'updated_date', 'tripName_id']
    list_filter = ['number', 'created_date']
    search_fields = ['number', 'startDate']


class CargoVehiclesAdmin(admin.ModelAdmin):
    list_display = ['id', 'number', 'startDate', 'created_date', 'updated_date', 'tripName_id']
    list_filter = ['number', 'created_date']
    search_fields = ['number', 'startDate']


admin.site.register(CarName, CarNameAdmin)
admin.site.register(TripName, TripNameAdmin)
admin.site.register(CarPassenger, CarPassengerAdmin)
admin.site.register(CargoVehicles, CargoVehiclesAdmin)
admin.site.register(Seats)
admin.site.register(Weight)
