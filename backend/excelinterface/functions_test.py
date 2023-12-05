import unittest
from functions import csv_to_triples, get_update_query, json_to_string_value, json_to_csv
from io import StringIO

class TestFunctions(unittest.TestCase):

    def test_csv_to_triples(self):
        csv_data = "subject,predicate1,predicate2\n" \
                   "subj1,obj1-1,obj1-2\n" \
                   "subj2,,obj2-2\n"
        expected_output = [
            ['subj1', 'predicate1', 'obj1-1'],
            ['subj1', 'predicate2', 'obj1-2'],
            ['subj2', 'predicate2', 'obj2-2']
        ]
        result = csv_to_triples(csv_data)
        self.assertEqual(result, expected_output)

    def test_get_update_query(self):
        before_triples = [['subj1', 'predicate1', 'obj1-1']]
        new_triples = [['subj2', 'predicate2', 'obj2-2']]
        expected_query = "DELETE {   subj1 predicate1 obj1-1. \n }\n" \
                         "INSERT {   subj2 predicate2 obj2-2. \n }\n" \
                         "WHERE { } "
        result = get_update_query(before_triples, new_triples)
        self.assertEqual(result.strip(), expected_query.strip())

    def test_json_to_string_value_uri(self):
        json_obj = {'type': 'uri', 'value': 'http://example.org/resource'}
        expected_result = '<http://example.org/resource>'
        result = json_to_string_value(json_obj)
        self.assertEqual(result, expected_result)

    def test_json_to_string_value_literal(self):
        json_obj = {'type': 'literal', 'value': 'example', 'datatype': 'http://www.w3.org/2001/XMLSchema#string'}
        expected_result = '\"example\"^^<http://www.w3.org/2001/XMLSchema#string>'
        result = json_to_string_value(json_obj)
        self.assertEqual(result, expected_result)

    def test_json_to_csv(self):
        json_data = [
            {'key1': 'value1', 'key2': 'value2'},
            {'key1': 'value3', 'key2': 'value4'}
        ]
        expected_csv = 'key1,key2\nvalue1,value2\nvalue3,value4\n'
        result = json_to_csv(json_data)
        self.assertEqual(result, expected_csv)

if __name__ == '__main__':
    unittest.main()
