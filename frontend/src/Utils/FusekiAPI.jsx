import APIManager from './APIManager';  

export const getFusekiDatasets = () => {
  return APIManager.get('/api/list_fuseki_datasets/')
    .then(data => {
        return data;
    })
    .catch(error => {
        throw error;
    });
};

export const getDatabaseTypes = () => {
    return APIManager.get('/api/get_database_types/')
      .then(data => {
          return data;
      })
      .catch(error => {
          throw error;
      });
  };