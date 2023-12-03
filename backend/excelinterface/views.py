# from rdflib.plugins.sparql import prepareQuery
from rest_framework.response import Response
from rest_framework import status
from pyfuseki import FusekiUpdate, FusekiQuery
from rest_framework.decorators import api_view
import requests, json, csv
from requests.auth import HTTPBasicAuth
from rest_framework import status, viewsets
from .models import DatabaseModel, MappingModel, InportDataModel
from .serializer import DatabaseModelSerializer, MappingModelSerializer, InportDataModelSerializer
from . import functions

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

@api_view(['POST'])
def update_database(request):
    csv_file = request.FILES['excel_sheet']
    print(csv_file)
    try:
        csv_file = csv_file.read().decode('utf-8')
        new_triples = functions.csv_to_triples(csv_file)
    except:
        return Response({'message': 'File format incorrect'}, status=400)
    
    #need to query psql server for the old triples of csv_file
    #harcoded old_triple for now
    before_triples = new_triples
    new_triples[0][2] = "<http://stardog.com/tutorial/AROOO>"
    #print(f"the new triples are {new_triples}")
    #get update query for fuseki
    db_name = "music"
    update_query_str = functions.get_update_query(before_triples, new_triples)
    #print(update_query_str)
    fuseki_update = FusekiUpdate('http://localhost:3030', db_name)

    query_result = fuseki_update.run_sparql(update_query_str)
    
    #return update_result and turn it into Response format to send back to post request

    response_json = query_result.convert()
    response_data = {
            'message' : response_json['message'],
    }
    #print(response_json)
    if response_json['message'] != "Update succeeded":
        print("huh")
        return Response(response_data, status=500)
    else:
        return Response(response_data, status=200)

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
  
@api_view(['GET'])
def generate_query(request):
    db_name = 'music'
    selectedType = 'Album'
    selectedPredicates = ['artist', 'description', 'track']
    prefix_string = \
        """
        prefix : <http://stardog.com/tutorial/>
        prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        prefix xsd: <http://www.w3.org/2001/XMLSchema#>
        """
    sparql_query = prefix_string + f"SELECT * WHERE {{ ?{selectedType.lower()} rdf:type :{selectedType} .\n"
    for predicate in selectedPredicates:
        sparql_query += f"      ?{selectedType.lower()} :{predicate} ?{predicate} .\n"
    sparql_query += "}\n"
    print(sparql_query)
    fuseki_update = FusekiUpdate('http://localhost:3030', db_name)
    fuseki_query = FusekiQuery('http://localhost:3030', db_name)
    query_result = fuseki_query.run_sparql(sparql_query)
    response_json = query_result.convert()
    json_data = json.dumps(response_json, indent=4)
    # print(json_data)
    #
    file_path = '/Users/xinlin/Desktop/CS130/CS130-Group-Project/backend/excelinterface/response.json'
    # df = pd.read_json(json_data)
    # df.to_csv("output.csv", index = False)
    # Writing JSON data to a file
    with open(file_path, 'w') as file:
        file.write(json_data)

    with open(file_path, 'r', encoding='utf-8') as json_file:
        json_data = json.load(json_file)

        # Extracting the data and headers
    data = json_data['results']['bindings']
    headers = ['album', 'artist', 'description', 'track']

    # Write to the CSV file
    csv_file_path = '/Users/xinlin/Desktop/CS130/CS130-Group-Project/backend/excelinterface/result.csv'
    with open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=headers)
        writer.writeheader()

        for entry in data:
            row = {key: entry[key]['value'] if key in entry else None for key in headers}
            writer.writerow(row)
    response = {'query': sparql_query, 'file_to_download': csv_file_path}
    return Response(response)

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
