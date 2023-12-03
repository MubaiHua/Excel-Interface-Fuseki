from django.urls import path
from .views import get_database_types, list_fuseki_datasets, create_database, get_type_predicates, update_database

urlpatterns = [
    path('get_database_types/', get_database_types, name='get_database_types'),
    path('list_fuseki_datasets/', list_fuseki_datasets, name='list_fuseki_datasets'),
    path('get_type_predicates/', get_type_predicates, name='get_type_predicates'),
    path('create_database/', create_database, name='create_database'),
    path('update_database/',update_database, name='update_database'),
    # path('get/', get, name='get'),
]

