import APIManager from './APIManager';

export const getFusekiDatasets = () => APIManager.get('/api/list_fuseki_datasets/')
  .then((data) => data)
  .catch((error) => {
    throw error;
  });

export const getDatabaseTypes = () => APIManager.get('/api/get_database_types/')
  .then((data) => data)
  .catch((error) => {
    throw error;
  });

export const getTypePredicates = () => APIManager.get('/api/get_type_predicates/')
  .then((data) => data)
  .catch((error) => {
    throw error;
  });
