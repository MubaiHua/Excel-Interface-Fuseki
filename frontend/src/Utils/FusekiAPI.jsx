import APIManager from './APIManager';

export const getFusekiDatasets = () => APIManager.get('/api/list_fuseki_datasets/');

export const getDatabaseTypes = (dbName) => APIManager.get(`/api/get_database_types/?db_name=${dbName}`);

export const addDatabaseFile = (data) => APIManager.post('/api/database/', data);

export const getTypePredicates = (dbName, selectedType) => APIManager.get(`/api/get_type_predicates/?db_name=${encodeURIComponent(dbName)}&selectedType=${encodeURIComponent(selectedType)}`);

export const generateQuery = (data) => APIManager.post('/api/mapping/', data); // ????????????
