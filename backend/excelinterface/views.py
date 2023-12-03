# from rdflib.plugins.sparql import prepareQuery
from rest_framework.response import Response
from rest_framework import status
from pyfuseki import FusekiUpdate, FusekiQuery
from rest_framework.decorators import api_view
import requests
from requests.auth import HTTPBasicAuth
from rest_framework import status, viewsets
from .models import DatabaseModel, MappingModel, InportDataModel
from .serializer import DatabaseModelSerializer, MappingModelSerializer, InportDataModelSerializer

username = 'admin'
password = '123456'
auth_obj = HTTPBasicAuth(username, password)


@api_view(['GET'])
def list_fuseki_datasets(request):
    fuseki_server_url = 'http://localhost:3030/$/datasets'
    try:
        # GET request to the Fuseki server to retrieve datasets
        response = requests.get(fuseki_server_url, auth=auth_obj)
        response.raise_for_status()  # will raise an HTTPError if an error occurs
        datasets = response.json()
        db_names = []
        for dataset in datasets['datasets']:
            db_names.append(dataset['ds.name'][1:])
        return Response(db_names)

    except requests.RequestException as e:
        error_message = str(e)
        if response:
            error_message += f", Response text: {response.text}"
        return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_database_types(request):
    db_name = 'music'
    # fuseki_update = FusekiUpdate('http://localhost:3030', db_name)
    fuseki_query = FusekiQuery('http://localhost:3030', db_name)
    sparql_str = """
    SELECT distinct?type
    {
        ?subj a ?type
    }
            """
    query_result = fuseki_query.run_sparql(sparql_str)
    response_json = query_result.convert()
    objects = response_json['results']['bindings']
    type_names = []
    for obj in objects:
        value = obj['type']['value']
        name = value.split("/")[-1]
        type_names.append(name)

    return Response(type_names)

@api_view(['GET'])
def get_type_predicates(request):
    db_name = 'music'
    selectedType = 'Album'
    predicate_name = 'p'
    prefix_string = \
    """
    prefix : <http://stardog.com/tutorial/>
    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    prefix xsd: <http://www.w3.org/2001/XMLSchema#>
    """

    sparql_query = prefix_string + f"SELECT distinct ?{predicate_name} WHERE{{ ?s rdf:type :{selectedType} . ?s ?{predicate_name} ?o .}}"
    # print(sparql_query)
    fuseki_update = FusekiUpdate('http://localhost:3030', db_name)
    fuseki_query = FusekiQuery('http://localhost:3030', db_name)
    query_result = fuseki_query.run_sparql(sparql_query)
    response_json = query_result.convert()
    predicates = response_json['results']['bindings']
    predicates_names = []
    for obj in predicates:
        value = obj[predicate_name]['value']
        if value[-4:] == 'type':
            continue
        name = value.split("/")[-1]
        predicates_names.append(name)
    # print(response_json)
    return Response(predicates_names)

class DatabaseModelViewSet(viewsets.ModelViewSet):
    queryset = DatabaseModel.objects.all()
    serializer_class = DatabaseModelSerializer

    def create(self, request, *args, **kwargs):
        # Assuming you receive some data in the request
        turtle_file = request.FILES['turtle_file']

        data_to_send = {
            'dbName': 'newDB',
            'dbType': 'tdb2'
            # Add other data as needed
        }

        # Make another API call with the data
        api_url = 'http://localhost:3030/$/datasets'
        try:
            response = requests.post(api_url, data=data_to_send, auth=auth_obj)
            # You can handle the response as needed
            if response.status_code == 200:
                # Successful API call
                return Response({'message': 'API call successful'})
            else:
                # Handle other response codes
                return Response({'message': 'API call failed'}, status=400)
        except requests.RequestException as e:
            # Handle exceptions, e.g., connection error
            return Response({'message': f'Error: {str(e)}'}, status=400)
