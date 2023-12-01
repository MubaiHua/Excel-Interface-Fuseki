from django.urls import path
from .views import get_database_types, list_fuseki_datasets

urlpatterns = [
    path('get_database_types/', get_database_types, name='get_database_types'),
    path('list_fuseki_datasets/', list_fuseki_datasets, name='list_fuseki_datasets'),
    # path('get/', get, name='get'),
]

