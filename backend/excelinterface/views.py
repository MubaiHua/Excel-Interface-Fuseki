# from rdflib.plugins.sparql import prepareQuery
from django.http import HttpResponse
from rest_framework.response import Response
from pyfuseki import FusekiUpdate, FusekiQuery
from rest_framework.decorators import api_view, action
import requests, json, csv
from requests.auth import HTTPBasicAuth
from django.conf import settings
from rest_framework import status, viewsets
from .models import DatabaseModel, MappingModel, ImportDataModel, ExportDataModel
from .serializer import DatabaseModelSerializer, MappingModelSerializer, ImportDataModelSerializer, \
    ExportDataModelSerializer
from .functions import csv_to_triples, get_update_query, json_to_string_value, json_to_csv
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
    db_object = DatabaseModel.objects.get(name=db_name)
    prefix_list = db_object.prefix
    prefix_string = "\n".join(prefix_list)

    sparql_query = prefix_string + f"SELECT distinct ?{predicate_name} WHERE{{ ?s rdf:type :{selectedType} . ?s ?{predicate_name} ?o .}}"
    # print(sparql_query)
    fuseki_update = FusekiUpdate(FUSEKI_END_POINT, db_name)
    fuseki_query = FusekiQuery(FUSEKI_END_POINT, db_name)
    query_result = fuseki_query.run_sparql(sparql_query)
    response_json = query_result.convert()
    predicates = response_json['results']['bindings']
    filtered_predicates = [obj for obj in predicates if not obj[predicate_name]['value'].endswith('type')]
    return Response(filtered_predicates)


class ExportDataModelViewSet(viewsets.ModelViewSet):
    queryset = ExportDataModel.objects.all()
    serializer_class = ExportDataModelSerializer

    def create(self, request, *args, **kwargs):
        try:
            # print("we are in")
            db_name = request.data['dbName']

            mapping_id = request.data['mapping_id']

            query_entry = MappingModel.objects.get(pk=mapping_id)
            sparql_query = query_entry.query
            # print(sparql_query)
            if "filter_equals" in request.data:
                # print("in filters")
                filter = request.data[
                    'filter_equals']  # json of var and values to compare e.g. {"name": "\"Please Please Me\"", "count": "42"} (quotations included for string literals)
                filter = json.loads(filter) if len(filter) != 0 else {}
                filter_queries = []
                for key in filter:
                    filter_query = f'FILTER (?{key} = {filter[key]}) .\n'
                    filter_queries.append(filter_query)
                sparql_query = sparql_query[:-1]
                for filter_query in filter_queries:
                    sparql_query += filter_query
                sparql_query += '}'
                # print(sparql_query)
            if "order_by_var" in request.data:
                order_by_var = request.data['order_by_var']  # variable name to order by e.g. name
                order_by = request.data['order_by']  # asc or desc
                order_query = f'ORDER BY {order_by}(?{order_by_var})\n'
                sparql_query += order_query
            if "limit" in request.data:
                limit = request.data['limit']  # numeric value
                limit_query = f'LIMIT {limit}\n'
                sparql_query += limit_query

            # print(sparql_query)

            # fuseki_update = FusekiUpdate('http://localhost:3030', db_name)
            fuseki_query = FusekiQuery(FUSEKI_END_POINT, db_name)
            try:
                query_result = fuseki_query.run_sparql(sparql_query)
            except:
                return Response({'message': 'bad query to fuseki, check if your filter values are valid data types!'},
                                status=400)
            response_json = query_result.convert()
            # print("we are past the query")
            data = response_json['results']['bindings']
            headers = response_json['head']['vars']
            row_list = []
            for entry in data:
                row = {key: json_to_string_value(entry[key]) if key in entry else None for key in headers}
                row_list.append(row)
            # print(type(headers))
            csv_data = json_to_csv(headers, row_list)
            # print(csv_data)
            data = {
                'mapping_id': mapping_id,
                'csv': csv_data,
                'query': sparql_query
            }
            serializer = self.serializer_class(data=data, many=False)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response({'message': 'unable to update export database'}, status=400)
            export_id = serializer.data['id']
            response = HttpResponse(content_type=f"{export_id}.csv")
            response['Content-Disposition'] = f'attachment; filename="{export_id}.csv"'

            # Write the CSV data to the response
            response.write(csv_data)

            return response

        except Exception as e:
            return Response({'message': 'unable to update export database'}, status=400)

    @action(detail=False, methods=['post'])
    def get_all_exports(self, request, *args, **kwargs):
        mapping_id = request.data['mappingID']
        queryset = ExportDataModel.objects.filter(mapping_id=mapping_id)
        included_fields = ['id']
        serializer = self.get_serializer(queryset, many=True, fields=included_fields)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def custom_export(self, request, *args, **kwargs):
        try:
            mapping_id = request.data['mapping_id']
            db_name = request.data['dbName']
            query_entry = MappingModel.objects.get(pk=mapping_id)
            sparql_query = query_entry.query
            fuseki_query = FusekiQuery(FUSEKI_END_POINT, db_name)
            try:
                query_result = fuseki_query.run_sparql(sparql_query)
            except:
                return Response({'message': 'bad query to fuseki, check if your filter values are valid data types!'},
                                status=400)
            response_json = query_result.convert()
            # print("we are past the query")
            data = response_json['results']['bindings']
            headers = response_json['head']['vars']
            row_list = []
            for entry in data:
                row = {key: json_to_string_value(entry[key]) if key in entry else None for key in headers}
                row_list.append(row)
            # print(type(headers))
            csv_data = json_to_csv(headers, row_list)
            # print(csv_data)
            data = {
                'mapping_id': mapping_id,
                'csv': csv_data,
                'query': sparql_query
            }
            serializer = self.serializer_class(data=data, many=False)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response({'message': 'unable to update export database'}, status=400)
            export_id = serializer.data['id']
            response = HttpResponse(content_type=f"{export_id}.csv")
            response['Content-Disposition'] = f'attachment; filename="{export_id}.csv"'

            # Write the CSV data to the response
            response.write(csv_data)

            return response
        except:
            return Response({'message': 'unable to export'}, status=400)

class ImportDataModelViewSet(viewsets.ModelViewSet):
    queryset = ImportDataModel.objects.all()
    serializer_class = ImportDataModelSerializer

    def create(self, request, *args, **kwargs):
        # print("wehat")
        db_name = request.data['dbName']
        csv_file = request.data['csvData']
        export_id = request.data['exportValue']
        export_entry = ExportDataModel.objects.get(id=export_id)
        # print(export_entry)
        old_csv_data = export_entry.csv
        # print(old_csv_data)
        # old_csv_data = json.dumps(old_csv_data)
        export_mapping = export_entry.mapping_id
        # print(export_mapping)
        # mapping_entry = MappingModel.objects.get(pk = export_mapping)
        predicate_var_to_val = json.loads(export_mapping.predicate_var_to_val)
        # print(predicate_var_to_val)

        before_triples = csv_to_triples(old_csv_data)

        # print(csv_file)
        try:
            new_triples = csv_to_triples(csv_file)
        except:
            return Response({'message': 'File format incorrect'}, status=400)

        for i in range(len(before_triples)):
            var_name = before_triples[i][1]
            print(var_name)
            value_name = predicate_var_to_val.get(var_name, -1)
            if value_name == -1:
                return Response({'message': 'csv column headers have been changed!'}, status=400)
            else:
                before_triples[i][1] = value_name
        # print("before triples done")
        # print(new_triples)
        for i in range(len(new_triples)):
            var_name = new_triples[i][1]
            # print(var_name)
            value_name = predicate_var_to_val.get(var_name, -1)
            if value_name == -1:
                return Response({'message': 'csv column headers have been changed!'}, status=400)
            else:
                new_triples[i][1] = value_name
        # need to query psql server for the old triples of csv_file
        # harcoded old_triple for now

        # print(f"the new triples are {new_triples}")
        # get update query for fuseki
        # print("what")
        update_query_str = get_update_query(before_triples, new_triples)
        # print(update_query_str)
        fuseki_update = FusekiUpdate(FUSEKI_END_POINT, db_name)

        fuseki_update.sparql_conn.setHTTPAuth(BASIC)
        fuseki_update.sparql_conn.setCredentials(username, password)
        query_result = fuseki_update.run_sparql(update_query_str)

        # return update_result and turn it into Response format to send back to post request
        data = {
            'export_id': export_id,
            'csv': csv_file,
            'query': update_query_str
        }
        serializer = self.serializer_class(data=data, many=False)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response({'message': 'unable to update export database'}, status=400)

        response_json = query_result.convert()
        response_data = {
            'message': response_json['message'],
        }
        # print(response_json)
        if response_json['message'] != "Update succeeded":
            # print("huh")
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

    def delete(self, request, *args, **kwargs):
        pass
    
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
        selectedPredicates = request.data['predicateList']
        # print("selectedPredicates")
        # print(type(selectedPredicates))
        db_object = DatabaseModel.objects.get(name=db_name)
        prefix_list = db_object.prefix
        prefix_string = "\n".join(prefix_list)
        sparql_query = prefix_string + f"SELECT * WHERE {{ ?{selectedType.lower()} rdf:type :{selectedType} .\n"
        predicate_var_to_value = {}
        for obj in selectedPredicates:
            # print(obj)
            predicate_value = json_to_string_value(obj[predicate_name])
            predicate_var_name = obj[predicate_name]['value'].split('/')[-1]
            # print(predicate_value)
            # print(predicate_var_name)
            predicate_var_to_value[predicate_var_name] = predicate_value
            sparql_query += f"      ?{selectedType.lower()} {predicate_value} ?{predicate_var_name} .\n"
        sparql_query += "}\n"
        predicate_var_to_val_json = json.dumps(predicate_var_to_value)
        data = {
            'name': mapping_name,
            'db_id': db_object.id,
            'query': sparql_query,
            'predicate_var_to_val': predicate_var_to_val_json
        }

        serializer = self.serializer_class(data=data, many=False)
        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({'message': 'Fail to create new mapping'}, status=400)

    @action(detail=False, methods=['post'])
    def create_custom_mapping(self, request, *args, **kwargs):
        db_name = request.data['selectedDatabase']
        db_object = DatabaseModel.objects.get(name=db_name)
        db_id = db_object.id
        mapping_name = request.data['mappingName']
        query = request.data['sparqlCode']
        data = {
            'db_id': db_id,
            'name': mapping_name,
            'query': query,
            'is_custom_mapping': True
        }
        serializer = self.get_serializer(data=data, many=False)
        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({'message': 'Fail to create new mapping'}, status=400)

    @action(detail=False, methods=['post'])
    def get_all_mappings(self, request, *args, **kwargs):
        database_id = request.data['databaseID']
        queryset = MappingModel.objects.filter(db_id=database_id)
        included_fields = ['name', 'id']
        serializer = self.get_serializer(queryset, many=True, fields=included_fields)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def check_name_duplicate(self, request, *args, **kwargs):
        name = request.data['name']
        return Response({'duplicate': MappingModel.objects.filter(name=name).exists()})

    @action(detail=False, methods=['post'])
    def get_predicates(self, request, *args, **kwargs):
        try:
            mapping_id = request.data['mappingID']
            queryset = MappingModel.objects.get(id=mapping_id)
            included_fields = ['id', 'predicate_var_to_val']
            serializer = self.get_serializer(queryset, many=False, fields=included_fields)
            result = serializer.data['predicate_var_to_val']
            predicates_dict = json.loads(result)
            predicates_name_list = list(predicates_dict)
            return Response(predicates_name_list)
        except:
            return Response({'message': 'Fail'}, status=400)

    @action(detail=False, methods=['post'])
    def is_custom_mapping(self, request, *args, **kwargs):
        try:
            mapping_id = request.data['mappingID']
            queryset = MappingModel.objects.get(id=mapping_id)
            included_fields = ['id', 'is_custom_mapping']
            serializer = self.get_serializer(queryset, many=False, fields=included_fields)
            return Response(serializer.data)
        except:
            return Response({'message': 'Fail'}, status=400)
