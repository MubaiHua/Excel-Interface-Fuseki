from django.test import TestCase, RequestFactory
from django.urls import reverse
from rest_framework import status
from .views import list_fuseki_datasets, get_database_types, update_database
from .models import DatabaseModel
from unittest.mock import patch, MagicMock

class ViewsTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        DatabaseModel.objects.create(name='default', prefix=[], turtle_file='')

    def test_list_fuseki_datasets(self):
        request = self.factory.get(reverse('list_fuseki_datasets'))
        response = list_fuseki_datasets(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)