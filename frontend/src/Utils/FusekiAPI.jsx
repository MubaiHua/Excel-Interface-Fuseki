import APIManager from './APIManager';

/**
 * Utility function to get Fuseki datasets.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const getFusekiDatasets = () => APIManager.get('/api/list_fuseki_datasets/');

/**
 * Utility function to get database types for a specific database.
 * @param {string} dbName - The name of the database.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const getDatabaseTypes = (dbName) => APIManager.get(`/api/get_database_types/?db_name=${dbName}`);

/**
 * Utility function to add a database file.
 * @param {Object} data - The data for adding a database file.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const addDatabaseFile = (data) => APIManager.post('/api/database/', data);

/**
 * Utility function to delete a database.
 * @param {Object} data - The data for deleting a database.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const deleteDatabase = (data) => APIManager.post('/api/database/delete_database/', data);

/**
 * Utility function to get type predicates for a specific database and selected type.
 * @param {string} dbName - The name of the database.
 * @param {string} selectedType - The selected type.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const getTypePredicates = (dbName, selectedType) => APIManager.get(`/api/get_type_predicates/?db_name=${encodeURIComponent(dbName)}&selectedType=${encodeURIComponent(selectedType)}`);

/**
 * Utility function to generate a query.
 * @param {Object} data - The data for generating a query.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const generateQuery = (data) => APIManager.post('/api/mapping/', data);

/**
 * Utility function to get all databases.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const getAllDatabase = () => APIManager.get('/api/database/get_all_databases/');

/**
 * Utility function to get all mappings.
 * @param {Object} data - The data for getting all mappings.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const getAllMappings = (data) => APIManager.post('/api/mapping/get_all_mappings/', data);

/**
 * Utility function to get all exports.
 * @param {Object} data - The data for getting all exports.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const getAllExports = (data) => APIManager.post('/api/export/get_all_exports/', data);

/**
 * Utility function to check for duplicate mapping names.
 * @param {Object} data - The data for checking duplicate mapping names.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const checkDuplicateMappingName = (data) => APIManager.post('/api/mapping/check_name_duplicate/', data);

/**
 * Utility function to get an export in Excel format.
 * @param {Object} data - The data for getting an export in Excel format.
 * @returns {Promise} A Promise that resolves to a blob representing the file.
 */
export const getExportExcel = (data) => APIManager.postGetFile('/api/export/', data);

/**
 * Utility function to post an Excel import.
 * @param {Object} data - The data for posting an Excel import.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const postImportExcel = (data) => APIManager.post('/api/import/', data);

/**
 * Utility function to get predicates.
 * @param {Object} data - The data for getting predicates.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const getPredicates = (data) => APIManager.post('/api/mapping/get_predicates/', data);

/**
 * Utility function to create a custom mapping.
 * @param {Object} data - The data for creating a custom mapping.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const createCustomMapping = (data) => APIManager.post('/api/mapping/create_custom_mapping/', data);

/**
 * Utility function to check if a mapping is custom.
 * @param {Object} data - The data for checking if a mapping is custom.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export const isCustomMapping = (data) => APIManager.post('/api/mapping/is_custom_mapping/', data);

/**
 * Utility function for custom export.
 * @param {Object} data - The data for custom export.
 * @returns {Promise} A Promise that resolves to a blob representing the file.
 */
export const customExport = (data) => APIManager.postGetFile('/api/export/custom_export/', data);
