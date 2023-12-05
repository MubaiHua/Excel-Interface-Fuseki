import APIManager from './APIManager';

export const getFusekiDatasets = () => APIManager.get('/api/list_fuseki_datasets/');

export const getDatabaseTypes = (dbName) => APIManager.get(`/api/get_database_types/?db_name=${dbName}`);

export const addDatabaseFile = (data) => APIManager.post('/api/database/', data);

export const deleteDatabase = (data) => APIManager.post('/api/database/delete_database/', data);

export const getTypePredicates = (dbName, selectedType) => APIManager.get(`/api/get_type_predicates/?db_name=${encodeURIComponent(dbName)}&selectedType=${encodeURIComponent(selectedType)}`);

export const generateQuery = (data) => APIManager.post('/api/mapping/', data);

export const getAllDatabase = () => APIManager.get('/api/database/get_all_databases/');

export const getAllMappings = (data) => APIManager.post('/api/mapping/get_all_mappings/', data);

export const getAllExports = (data) => APIManager.post('/api/export/get_all_exports/', data);

export const checkDuplicateMappingName = (data) => APIManager.post('/api/mapping/check_name_duplicate/', data);

export const getExportExcel = (data) => APIManager.postGetFile('/api/export/', data);

export const postImportExcel = (data) => APIManager.post('/api/import/', data);

export const getPredicates = (data) => APIManager.post('/api/mapping/get_predicates/', data);

export const createCustomMapping = (data) => APIManager.post('/api/mapping/create_custom_mapping/', data);

export const isCustomMapping = (data) => APIManager.post('/api/mapping/is_custom_mapping/', data);

export const customExport = (data) => APIManager.postGetFile('/api/export/custom_export/', data);
