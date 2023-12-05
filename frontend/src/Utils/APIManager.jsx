import axios from 'axios';
import { getJWTToken } from './LocalStorageAccessor';

export default class APIManager {
  static get(endpoint) {
    return axios.get(String(process.env.REACT_APP_ENDPOINT) + endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getJWTToken()}`,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.log(`Error in GET request to ${endpoint}:`, error);
        return error;
      });
  }

  static post(endpoint, data) {
    return axios.post(String(process.env.REACT_APP_ENDPOINT) + endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getJWTToken()}`,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.log(`Error in POST request to ${endpoint}:`, error);
        return error;
      });
  }

  static postGetFile(endpoint, data) {
    return axios.post(String(process.env.REACT_APP_ENDPOINT) + endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getJWTToken()}`,
      },
      responseType: 'blob',
    });
  }

  static put(endpoint, data) {
    return axios.put(String(process.env.REACT_APP_ENDPOINT) + endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getJWTToken()}`,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.log(`Error in PUT request to ${endpoint}:`, error);
        return error;
      });
  }

  static patch(endpoint, data) {
    return axios.patch(String(process.env.REACT_APP_ENDPOINT) + endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getJWTToken()}`,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.log(`Error in PATCH request to ${endpoint}:`, error);
        return error;
      });
  }

  static delete(endpoint) {
    return axios.delete(String(process.env.REACT_APP_ENDPOINT) + endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getJWTToken()}`,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.log(`Error in DELETE request to ${endpoint}:`, error);
        return error;
      });
  }
}
