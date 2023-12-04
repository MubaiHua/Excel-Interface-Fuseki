# from rdflib.plugins.sparql import prepareQuery
from rest_framework.response import Response
from rest_framework import status
from pyfuseki import FusekiUpdate, FusekiQuery
from rest_framework.decorators import api_view, action
import requests, json, csv
from requests.auth import HTTPBasicAuth
from django.conf import settings
from rest_framework import status, viewsets
from .models import DatabaseModel, MappingModel, ImportDataModel, ExportDataModel
from .serializer import DatabaseModelSerializer, MappingModelSerializer, ImportDataModelSerializer, ExportDataModelSerializer
from . import functions
import io
from SPARQLWrapper import BASIC

FUSEKI_END_POINT = settings.FUSEKI_END_POINT
username = 'admin'
password = '123456'
auth_obj = HTTPBasicAuth(username, password)


@api_view(['GET'])
def list_fuseki_datasets(request):
    fuseki_server_url = f'{FUSEKI_END_POINT}/$/datasets'
    try:
        # GET request to the Fuseki server to retrieve datasets
        response = requests.get(fuseki_server_url, auth=auth_obj)
        # response.raise_for_status()  # will raise an HTTPError if an error occurs
        datasets = response.json()
        db_names = []
        for dataset in datasets['datasets']:
            if dataset['ds.name'][1:] != 'ds':
                db_names.append(dataset['ds.name'][1:])
        return Response(db_names)

    except Exception as e:
        error_message = str(e)
        return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_database_types(request):
    db_name = request.query_params.get('db_name', 'default')
    # fuseki_update = FusekiUpdate(FUSEKI_END_POINT, db_name)

    # NEED to check whether the db_name
    fuseki_query = FusekiQuery(FUSEKI_END_POINT, db_name)
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
    db_name = request.query_params.get('db_name', 'default')  # Provide a default value if not supplied
    selectedType = request.query_params.get('selectedType', 'default')  # Provide a default value if not supplied

    predicate_name = 'predicate'

    # currently the prefix of the graph should be the same in order to retrieve correct data, adjust later based on the ttl file user uploaded
    prefix_string = \
        """
        prefix : <http://stardog.com/tutorial/>
        prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        prefix xsd: <http://www.w3.org/2001/XMLSchema#>
        """

    sparql_query = prefix_string + f"SELECT distinct ?{predicate_name} WHERE{{ ?s rdf:type :{selectedType} . ?s ?{predicate_name} ?o .}}"
    # print(sparql_query)
    fuseki_update = FusekiUpdate(FUSEKI_END_POINT, db_name)
    fuseki_query = FusekiQuery(FUSEKI_END_POINT, db_name)
    query_result = fuseki_query.run_sparql(sparql_query)
    response_json = query_result.convert()
    predicates = response_json['results']['bindings']
    predicates_names = []
    filtered_predicates = [obj for obj in predicates if not obj[predicate_name]['value'].endswith('type')]
    return Response(filtered_predicates)

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
    db_name = "test4"
    update_query_str = functions.get_update_query(before_triples, new_triples)
    print(update_query_str)
    fuseki_update = FusekiUpdate(FUSEKI_END_POINT, db_name)

    query_result = fuseki_update.run_sparql(update_query_str)

    #return update_result and turn it into Response format to send back to post request

    response_json = query_result.convert()
    response_data = {
            'message' : response_json['message'],
    }
    #print(response_json)
    if response_json['message'] != "Update succeeded":
        print("huh")
        return Response(response_data, status=400)
    else:
        return Response(response_data, status=200)
class ExportDataModelViewSet(viewsets.ModelViewSet):
    queryset = ExportDataModel.objects.all()
    serializer_class = ExportDataModelSerializer

    def create(self, request, *args, **kwargs):
        print("we are in")
        db_name = request.data['dbName']

        mapping_id = request.data['mapping_id']

        query_entry = MappingModel.objects.get(pk=mapping_id)
        sparql_query = query_entry.query

        #fuseki_update = FusekiUpdate('http://localhost:3030', db_name)
        fuseki_query = FusekiQuery(FUSEKI_END_POINT, db_name)
        query_result = fuseki_query.run_sparql(sparql_query)
        response_json = query_result.convert()
        json_data = json.dumps(response_json, indent=4)
        print(json_data)
        
        file_path = 'response.json'

        # # Writing JSON data to a file
        with open(file_path, 'w') as file:
            file.write(json_data)
        
        with open(file_path, 'r', encoding='utf-8') as json_file:
            json_data = json.load(json_file)
        
            # Extracting the data and headers
        data = json_data['results']['bindings']
        headers = json_data['head']['vars']
        #print(headers)
        
        # # Write to the CSV file
        csv_file_path = 'result.csv'
        with open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=headers)
            writer.writeheader()
        
            for entry in data:
                row = {key: functions.json_to_string_value(entry[key]) if key in entry else None for key in headers}
                writer.writerow(row)
        with open(csv_file_path,'rb') as csv_file:
            csv_file_content = csv_file.read().decode('utf-8')
        print("loading psql data")
        print(csv_file_content)
        data = {
                    'mapping_id': mapping_id,
                    'csv': csv_file_content,
                    'query': sparql_query
                }
        serializer = self.serializer_class(data=data, many=False)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response({'message':'unable to update export database'}, status = 400)
        
        response = {'query': sparql_query, 'file_to_download': csv_file_content}
        return Response(response)


class ImportDataModelViewSet(viewsets.ModelViewSet):
    queryset = ImportDataModel.objects.all()
    serializer_class = ImportDataModelSerializer

    #@action(detail=False, methods=['post'])
    def create(self, request, *args, **kwargs):
        #print("wehat")
        db_name = request.data['dbName']
        csv_file = request.FILES['excel_sheet']
        
        export_id = request.data['export_id']
        export_entry = ExportDataModel.objects.get(pk=export_id)
        print(export_entry)
        old_csv_data = export_entry.csv
        print(old_csv_data)
        #old_csv_data = json.dumps(old_csv_data)
        export_mapping = export_entry.mapping_id
        #print(export_mapping)
        #mapping_entry = MappingModel.objects.get(pk = export_mapping)
        predicate_var_to_val = json.loads(export_mapping.predicate_var_to_val)
        print(predicate_var_to_val)

        before_triples = functions.csv_to_triples(old_csv_data)

        #print(csv_file)
        try:
            csv_file = csv_file.read().decode('utf-8')
            new_triples = functions.csv_to_triples(csv_file)
        except:
            return Response({'message': 'File format incorrect'}, status=400)

        for i in range(len(before_triples)):
            var_name = before_triples[i][1]
            print(var_name)
            value_name = predicate_var_to_val.get(var_name, -1)
            if value_name == -1:
                return Response({'message':'csv column headers have been changed!'}, status=400)
            else:
                before_triples[i][1] = value_name
        print("before triples done")
        #print(new_triples)
        for i in range(len(new_triples)):
            var_name = new_triples[i][1]
            print(var_name)
            value_name = predicate_var_to_val.get(var_name, -1)
            if value_name == -1:
                return Response({'message':'csv column headers have been changed!'}, status=400)
            else:
                new_triples[i][1] = value_name
        #need to query psql server for the old triples of csv_file
        #harcoded old_triple for now
        
        #print(f"the new triples are {new_triples}")
        #get update query for fuseki
        print("what")
        update_query_str = functions.get_update_query(before_triples, new_triples)
        print(update_query_str)
        fuseki_update = FusekiUpdate(FUSEKI_END_POINT, db_name)
        
        fuseki_update.sparql_conn.setHTTPAuth(BASIC)
        fuseki_update.sparql_conn.setCredentials(username,password)
        query_result = fuseki_update.run_sparql(update_query_str)

        #return update_result and turn it into Response format to send back to post request
        data = {
                    'mapping_id': export_id,
                    'csv': csv_file,
                    'query': update_query_str
                }
        serializer = self.serializer_class(data=data, many=False)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response({'message':'unable to update export database'}, status = 400)
        
        response_json = query_result.convert()
        response_data = {
                'message' : response_json['message'],
        }
        #print(response_json)
        if response_json['message'] != "Update succeeded":
            print("huh")
            return Response(response_data, status=400)
        else:
            return Response(response_data, status=200)
class DatabaseModelViewSet(viewsets.ModelViewSet):
    queryset = DatabaseModel.objects.all()
    serializer_class = DatabaseModelSerializer

    def create(self, request, *args, **kwargs):
        # Assuming you receive some data in the request
        databaseName = request.data['databaseName']

        data_to_send = {
            'dbName': databaseName,
            'dbType': 'tdb2'
            # Add other data as needed
        }

        # Make another API call with the data
        api_url = f'{FUSEKI_END_POINT}/$/datasets'
        created = False
        try:
            response = requests.post(api_url, data=data_to_send, auth=auth_obj)
            if response.status_code == 200:
                created = True
                rdf_turtle = request.data['fileContent']
                prefix_lines = []

                for line in rdf_turtle.split('\n'):
                    if line.strip().startswith("PREFIX"):
                        prefix_lines.append(line.strip())

                data = {
                    'name': databaseName,
                    'turtle_file': rdf_turtle,
                    'prefix': prefix_lines
                }
                if 'graphName' in request.data:
                    data['graph_name'] = request.data['graphName']

                try:
                    url = f'{FUSEKI_END_POINT}/{databaseName}/data'

                    # Create a temporary file and write the string data to it
                    in_memory_file = io.StringIO(rdf_turtle)

                    # Use the temporary file in the request
                    with in_memory_file as file:
                        files = {'file': (f"{databaseName}.ttl", file.read(), 'text/turtle')}

                    response = requests.post(url, files=files, auth=auth_obj)
                    if response.status_code == 200:
                        serializer = self.serializer_class(data=data, many=False)
                        if serializer.is_valid():
                            serializer.save()
                            headers = self.get_success_headers(serializer.data)
                            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                        else:
                            requests.delete(f"{FUSEKI_END_POINT}/$/datasets/{databaseName}")
                            return Response({'error': serializer.errors}, status=400)
                    else:
                        return Response({'error': 'Fail to create new database'}, status=400)
                except Exception as e:
                    if created:
                        requests.delete(f"{FUSEKI_END_POINT}/$/datasets/{databaseName}")
                    return Response({'message': 'Fail to create new database', 'error': e}, status=400)

            else:
                return Response({'message': 'Fail to create new database'}, status=400)
        except Exception as e:
            return Response({'message': 'Fail to create new database', 'error': e}, status=400)

    @action(detail=False, methods=['post'])
    def delete_all_fuseki_database(self, request, *args, **kwargs):
        try:
            DatabaseModel.objects.all().delete()
            return Response({'message': 'success'}, status=204)
        except Exception as e:
            return Response({'message': 'fail'}, status=400)

    @action(detail=False, methods=['get'])
    def get_all_databases(self, request, *args, **kwargs):
        queryset = DatabaseModel.objects.all()
        included_fields = ['name', 'id']
        serializer = self.get_serializer(queryset, many=True, fields=included_fields)
        return Response(serializer.data)


class MappingModelViewSet(viewsets.ModelViewSet):
    queryset = MappingModel.objects.all()
    serializer_class = MappingModelSerializer

    def create(self, request, *args, **kwargs):
        predicate_name = "predicate"
        db_name = request.data['dbName']
        mapping_name = request.data['mappingName']
        selectedType = request.data['selectedType']
        selectedPredicates = request.data['selectedPredicates']
        db_object = DatabaseModel.objects.get(name=db_name)
        prefix_list = db_object.prefix
        prefix_string = "\n".join(prefix_list)
        sparql_query = prefix_string + f"SELECT * WHERE {{ ?{selectedType.lower()} rdf:type :{selectedType} .\n"
        predicates_json = json.loads(selectedPredicates)
        predicate_var_to_value = {}
        for obj in predicates_json:
            print(obj)
            predicate_value = functions.json_to_string_value(obj[predicate_name])
            predicate_var_name = obj[predicate_name]['value'].split('/')[-1]
            print(predicate_value)
            print(predicate_var_name)
            predicate_var_to_value[predicate_var_name] = predicate_value
            sparql_query += f"      ?{selectedType.lower()} {predicate_value} ?{predicate_var_name} .\n"
        sparql_query += "}\n"
        predicate_var_to_val_json = json.dumps(predicate_var_to_value)
        data = {
            'name':mapping_name,
            'db_id': db_object.id,
            'query': sparql_query,
            'predicate_var_to_val': predicate_var_to_val_json
        }

        serializer = self.serializer_class(data = data, many=False)
        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({'message': 'Fail to create new mapping'}, status=400)
        # fuseki_update = FusekiUpdate('http://localhost:3030', db_name)
        # fuseki_query = FusekiQuery('http://localhost:3030', db_name)
        # query_result = fuseki_query.run_sparql(sparql_query)
        # response_json = query_result.convert()
        # json_data = json.dumps(response_json, indent=4)
        # # print(json_data)
        # #
        # file_path = '/Users/xinlin/Desktop/CS130/CS130-Group-Project/backend/excelinterface/response.json'
        # # df = pd.read_json(json_data)
        # # df.to_csv("output.csv", index = False)
        # # Writing JSON data to a file
        # with open(file_path, 'w') as file:
        #     file.write(json_data)
        #
        # with open(file_path, 'r', encoding='utf-8') as json_file:
        #     json_data = json.load(json_file)
        #
        #     # Extracting the data and headers
        # data = json_data['results']['bindings']
        # headers = ['album', 'artist', 'description', 'track']
        #
        # # Write to the CSV file
        # csv_file_path = '/Users/xinlin/Desktop/CS130/CS130-Group-Project/backend/excelinterface/result.csv'
        # with open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
        #     writer = csv.DictWriter(csv_file, fieldnames=headers)
        #     writer.writeheader()
        #
        #     for entry in data:
        #         row = {key: entry[key]['value'] if key in entry else None for key in headers}
        #         writer.writerow(row)
        # response = {'query': sparql_query, 'file_to_download': csv_file_path}
        # return Response(response)

    @action(detail=False, methods=['post'])
    def get_all_mappings(self, request, *args, **kwargs):
        database_id = request.data['databaseID']
        queryset = MappingModel.objects.filter(db_id=database_id)
        included_fields = ['name', 'id']
        serializer = self.get_serializer(queryset, many=True, fields=included_fields)
        return Response(serializer.data)