from rest_framework import viewsets

from .models import Assignment
from .serializers import AssignmentSerializer

# Create your views here.


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()
