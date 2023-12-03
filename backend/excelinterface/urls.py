from django.urls import path
from .views import get_database_types, list_fuseki_datasets, DatabaseModelViewSet, get_type_predicates
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'database', DatabaseModelViewSet, 'database')

urlpatterns = [
    path('get_database_types/', get_database_types, name='get_database_types'),
    path('list_fuseki_datasets/', list_fuseki_datasets, name='list_fuseki_datasets'),
    path('get_type_predicates/', get_type_predicates, name='get_type_predicates'),
]

urlpatterns+=router.urls