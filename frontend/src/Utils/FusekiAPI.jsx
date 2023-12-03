import APIManager from './APIManager';

export const getFusekiDatasets = () => APIManager.get('/api/list_fuseki_datasets/');

export const getDatabaseTypes = (dbName) => APIManager.get(`/api/get_database_types/?db_name=${dbName}`);

<<<<<<< HEAD
export const addDatabaseFile = (data) => APIManager.post('/api/database/', data);

export const getTypePredicates = () => APIManager.get('/api/get_type_predicates/');
=======
export const getTypePredicates = (dbName, selectedType) => APIManager.get(`/api/get_type_predicates/?db_name=${encodeURIComponent(dbName)}&selectedType=${encodeURIComponent(selectedType)}`);
>>>>>>> laiyin/Fuseki_Query_Generate_Frontend

export const getQueryData = (dbName, selectedType, selectedPredicates) => APIManager.get('/api/generate_query/'); //????????????
