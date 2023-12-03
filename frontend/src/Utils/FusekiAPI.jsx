import APIManager from './APIManager';

export const getFusekiDatasets = () => APIManager.get('/api/list_fuseki_datasets/');

export const getDatabaseTypes = () => APIManager.get('/api/get_database_types/');

export const addDatabaseFile = (data) => APIManager.post('/api/create_databse/', data);

export const getTypePredicates = () => APIManager.get('/api/get_type_predicates/');

export const getQueryData = () => APIManager.get('/api/generate_query/');
