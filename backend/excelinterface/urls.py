from django.urls import path
from .views import get_database_types, list_fuseki_datasets, get_type_predicates, generate_query, update_database, DatabaseModelViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'database', DatabaseModelViewSet, 'database')

urlpatterns = [
    path('get_database_types/', get_database_types, name='get_database_types'),
    path('list_fuseki_datasets/', list_fuseki_datasets, name='list_fuseki_datasets'),
    path('get_type_predicates/', get_type_predicates, name='get_type_predicates'),
    path('generate_query/', generate_query, name='generate_query'),
    path('update_database/',update_database, name='update_database'),
    # path('get/', get, name='get'),
]

urlpatterns+=router.urls