from django.test import TestCase, RequestFactory
from django.urls import reverse
from rest_framework import status
from .views import list_fuseki_datasets
from .models import DatabaseModel
from unittest.mock import patch, MagicMock


class ViewsTestCase(TestCase):
    def test_create_new_database(self):
        url = reverse('api/database')  # replace with your actual API endpoint
        data = {'databaseName': 'test Database',
                'fileContent': """
        PREFIX : <http://stardog.com/tutorial/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        
        :The_Beatles      rdf:type  :Band .
        :The_Beatles      :name     "The Beatles" .
        :The_Beatles      :member   :John_Lennon .
        :The_Beatles      :member   :Paul_McCartney .
        :The_Beatles      :member   :Ringo_Starr .
        :The_Beatles      :member   :George_Harrison .
        :John_Lennon      rdf:type  :SoloArtist .
        :Paul_McCartney   rdf:type  :SoloArtist .
        :Ringo_Starr      rdf:type  :SoloArtist .
        :George_Harrison  rdf:type  :SoloArtist .
        :Please_Please_Me rdf:type  :Album .
        :Please_Please_Me :name     "Please Please Me" .
        :Please_Please_Me :date     "1963-03-22"^^xsd:date .
        :Please_Please_Me :artist   :The_Beatles .
        :Please_Please_Me :track    :Love_Me_Do .
        :Love_Me_Do       rdf:type  :Song .
        :Love_Me_Do       :name     "Love Me Do" .
        :Love_Me_Do       :length   125 .
        :Love_Me_Do       :writer   :John_Lennon .
        :Love_Me_Do       :writer   :Paul_McCartney .
        
        :McCartney        rdf:type  :Album .
        :McCartney        :name     "McCartney" .
        :McCartney        :date     "1970-04-17"^^xsd:date .
        :McCartney        :artist   :Paul_McCartney .
        
        :Imagine          rdf:type  :Album .
        :Imagine          :name     "Imagine" .
        :Imagine          :date     "1971-10-11"^^xsd:date .
        :Imagine          :artist   :John_Lennon ."""
                }  # replace with your request payload

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_fuseki_datasets(self):
        url = reverse('api/list_fuseki_datasets/')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['key'], ['test Database'])

    def test_get_database_types(self):
        db_name = 'test Database'
        url = reverse(f'api/get_database_types/?db_name=${db_name}')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['key'], ["Band", "SoloArtist", "Album", "Song"])

    def test_get_type_predicates(self):
        db_name = 'test Database'
        type = 'Album'
        url = reverse(f'api/get_type_predicates/?db_name={db_name}&selectedType={type}')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = [
            {
                "predicate": {
                    "type": "uri",
                    "value": "http://stardog.com/tutorial/name"
                }
            },
            {
                "predicate": {
                    "type": "uri",
                    "value": "http://stardog.com/tutorial/date"
                }
            },
            {
                "predicate": {
                    "type": "uri",
                    "value": "http://stardog.com/tutorial/artist"
                }
            },
            {
                "predicate": {
                    "type": "uri",
                    "value": "http://stardog.com/tutorial/track"
                }
            }
        ]
        self.assertEqual(response.data['key'], expected_data)

    def test_create_mapping(self):
        payload = {"dbName": "Beatles", "selectedType": "Album",
                   "predicateList": [{"predicate": {"type": "uri", "value": "http://stardog.com/tutorial/name"}},
                                     {"predicate": {"type": "uri", "value": "http://stardog.com/tutorial/date"}},
                                     {"predicate": {"type": "uri", "value": "http://stardog.com/tutorial/artist"}}],
                   "mappingName": "new network 1"}
        url = reverse(f'api/mapping')
        response = self.client.post(url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
