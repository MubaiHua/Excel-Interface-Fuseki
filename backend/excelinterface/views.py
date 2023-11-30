from rest_framework.response import Response
from rest_framework import status
from pyfuseki import FusekiUpdate, FusekiQuery
from rest_framework.decorators import api_view
import requests
from requests.auth import HTTPBasicAuth

@api_view(['GET'])
def get(request):
    fuseki_update = FusekiUpdate('http://localhost:3030', 'message')
    fuseki_query = FusekiQuery('http://localhost:3030', 'message')
    sparql_str = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX ex: <http://example.com/>
    SELECT ?from ?msg ?subj
    WHERE {
      ?msg rdf:type ex:msg ;
           ex:from ?from ;
           ex:to "bob" ;
           ex:subj ?subj .
    }
            """
    query_result = fuseki_query.run_sparql(sparql_str)
    response_json = query_result.convert()
    print(response_json)
    return Response({'message': 'Hello, world!'})


@api_view(['GET'])
def list_fuseki_datasets(request):
    fuseki_server_url = 'http://localhost:3030/$/datasets'
    try:
        username = 'admin'
        password = '123456'
        
        # GET request to the Fuseki server to retrieve datasets
        response = requests.get(fuseki_server_url, auth=HTTPBasicAuth(username, password))
        response.raise_for_status()  # will raise an HTTPError if an error occurs
        datasets = response.json()

        return Response(datasets)
    
    except requests.RequestException as e:
        error_message = str(e)
        if response:
            error_message += f", Response text: {response.text}"
        return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


