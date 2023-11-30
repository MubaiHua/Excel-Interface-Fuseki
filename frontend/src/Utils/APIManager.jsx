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
        console.error(`Error in GET request to ${endpoint}:`, error);
        throw error;
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
        console.error(`Error in POST request to ${endpoint}:`, error);
        throw error;
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
        console.error(`Error in PUT request to ${endpoint}:`, error);
        throw error;
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
        console.error(`Error in PATCH request to ${endpoint}:`, error);
        throw error;
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
        console.error(`Error in DELETE request to ${endpoint}:`, error);
        throw error;
      });
  }
}
