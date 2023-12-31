import csv
import io


def csv_to_triples(csv_file):
    triples = []
    csv_file = io.StringIO(csv_file)
    csv_reader = csv.reader(csv_file)
    header = next(csv_reader)
    predicates = [predicate for predicate in header[1:]]
    for row in csv_reader:
        # print(row)
        subject = row[0]
        for i, object in enumerate(row[1:]):
            if object != '':
                triples.append([subject, predicates[i], object])
    # print(triples)
    return triples


def get_update_query(before_triples, new_triples):
    delete_clause = ""
    insert_clause = ""

    # Iterate through the old triples and construct DELETE statements
    for triple in before_triples:
        # print(triple)
        subject, predicate, obj = triple
        delete_clause += f"  {subject} {predicate} {obj}. \n"

    # Iterate through the new triples and construct INSERT statements
    for triple in new_triples:
        subject, predicate, obj = triple
        insert_clause += f"  {subject} {predicate} {obj}. \n"

    query = f'''DELETE {{ {delete_clause} }}
INSERT {{ {insert_clause} }}
WHERE {{ }} '''
    return query


def json_to_string_value(obj):
    if obj['type'] == 'uri':
        uri_str = '<' + obj['value'] + '>'
        return uri_str
    elif obj['type'] == 'literal':
        value = obj.get('value', '')  # Get the literal value
        datatype = obj.get('datatype', '')  # Get the datatype if available

        if datatype.startswith('http://www.w3.org/2001/XMLSchema#'):
            # Handle XML Schema datatypes
            # datatype = datatype.replace('http://www.w3.org/2001/XMLSchema#', 'xsd:')
            return_str = f'\"{value}\"^^<{datatype}>'
            #print(return_str)
            return return_str
        else:
            # Handle plain literals without a datatype
            return_str = f'\"{value}\"'
            #print(return_str)
            return return_str
    else:
        # Handle other types (e.g., blank nodes)
        return obj['value']


def json_to_csv(headers, json_data):
    # Assuming the JSON data is a list of dictionaries
    # Use csv.DictWriter to convert the list of dictionaries to CSV
    csv_data = ""
    csv_data += ','.join(headers) + '\n'  # Write header
    if json_data:
        
        for item in json_data:
            csv_data += ','.join(str(item[key]) for key in item.keys()) + '\n'
    csv_data = csv_data.replace('"', '"""')
    return csv_data
