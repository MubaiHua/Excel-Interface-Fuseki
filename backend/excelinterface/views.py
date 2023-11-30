from rest_framework.response import Response
from pyfuseki import FusekiUpdate, FusekiQuery
from rest_framework.decorators import api_view
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
def i_want_my_own_name(request):
    return Response("hello there")
