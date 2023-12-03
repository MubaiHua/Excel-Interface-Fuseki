import csv
import io

def csv_to_triples(csv_file):
    triples = []
    csv_file = io.StringIO(csv_file)
    csv_reader = csv.reader(csv_file)
    header = next(csv_reader)
    predicates = [predicate for predicate in header[1:]]
    for row in csv_reader:
        #print(row)
        subject = row[0]
        for i, object in enumerate(row[1:]):
            if object != '':
                triples.append([subject,predicates[i],object])
    #print(triples)
    return triples

def get_update_query(before_triples, new_triples):
    delete_clause = ""
    insert_clause = ""
    
    # Iterate through the old triples and construct DELETE statements
    for triple in before_triples:
        #print(triple)
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