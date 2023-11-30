from django.urls import path
from .views import get, list_fuseki_datasets

urlpatterns = [
    path('get/', get, name='get'),
    path('list_fuseki_datasets/', list_fuseki_datasets, name='list_fuseki_datasets'),
]

