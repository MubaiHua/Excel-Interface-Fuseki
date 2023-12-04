from django.urls import path
from .views import get_database_types, list_fuseki_datasets, get_type_predicates, update_database, DatabaseModelViewSet, ImportDataModelViewSet, MappingModelViewSet, ExportDataModelViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'database', DatabaseModelViewSet, 'database')
router.register(r'import', ImportDataModelViewSet, 'import')
router.register(r'mapping', MappingModelViewSet, 'mapping')
router.register(r'export', ExportDataModelViewSet, 'export')
urlpatterns = [
    path('get_database_types/', get_database_types, name='get_database_types'),
    path('list_fuseki_datasets/', list_fuseki_datasets, name='list_fuseki_datasets'),
    path('get_type_predicates/', get_type_predicates, name='get_type_predicates'),
    path('update_database/',update_database, name='update_database'),
    # path('get/', get, name='get'),
]

urlpatterns+=router.urls
