from rest_framework import viewsets, generics, permissions, parsers
from rest_framework.decorators import action
from rest_framework.views import Response
from .models import CarName, TripName, CarPassenger, CargoVehicles, Seats, Weight, User
from .serializers import CarNameSerializers, TripNameSerializers, CarPassengerSerializers, CargoVehiclesSerializers, SeatsSerializers, WeightSerializers, UserSerializers
from .pagination import TripNamePagination


class CarNameViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = CarName.objects.all()
    serializer_class = CarNameSerializers


class TripNameViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = TripName.objects.filter(active=True)
    serializer_class = TripNameSerializers
    pagination_class = TripNamePagination

    def get_queryset(self):
        q = self.queryset
        tripName = self.request.query_params.get('tripName')
        if tripName:
            q = q.filter(tripName__icontains=tripName)

        carName_id = self.request.query_params.get('carName_id')
        if carName_id:
            q = q.filter(carName_id=carName_id)

        return q

    @action(methods=['get'], detail=True,)
    def carPassenger(self, request, pk):
        tripName = self.get_object()
        carPassenger = tripName.CarPassenget_set.filter(active=True)
        return Response(CarPassengerSerializers(carPassenger, many=True).data)


class CarPassengerViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = CarPassenger.objects.filter(active=True)
    serializer_class = CarPassengerSerializers


class CargoVehiclesViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = CargoVehicles.objects.filter(active=True)
    serializer_class = CargoVehiclesSerializers


class SeatsViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Seats.objects.all()
    serializer_class = SeatsSerializers


class WeightViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializers


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializers
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['current-user']:
            return [permissions.IsAuthenticated]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def current_user(self, request):
        return Response(UserSerializers(request.user, context={'request': request}).data)