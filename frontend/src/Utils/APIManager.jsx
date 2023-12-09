import axios from 'axios';
import { getJWTToken } from './LocalStorageAccessor';

/**
 * Utility class for making API requests using Axios.
 * @class APIManager
 */
export default class APIManager {
  /**
   * Make a GET request to the specified API endpoint.
   * @static
   * @param {string} endpoint - The API endpoint.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static get(endpoint) {
    /**
     * Implementation details...
     */
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

  /**
   * Make a POST request to the specified API endpoint with the provided data.
   * @static
   * @param {string} endpoint - The API endpoint.
   * @param {Object} data - The data to be sent in the request body.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static post(endpoint, data) {
    /**
     * Implementation details...
     */
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

  /**
   * Make a POST request to the specified API endpoint and expect a file in response.
   * @static
   * @param {string} endpoint - The API endpoint.
   * @param {Object} data - The data to be sent in the request body.
   * @returns {Promise} A Promise that resolves to a blob representing the file.
   */
  static postGetFile(endpoint, data) {
    /**
     * Implementation details...
     */
    return axios.post(String(process.env.REACT_APP_ENDPOINT) + endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getJWTToken()}`,
      },
      responseType: 'blob',
    });
  }

  /**
   * Make a PUT request to the specified API endpoint with the provided data.
   * @static
   * @param {string} endpoint - The API endpoint.
   * @param {Object} data - The data to be sent in the request body.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static put(endpoint, data) {
    /**
     * Implementation details...
     */
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

  /**
   * Make a PATCH request to the specified API endpoint with the provided data.
   * @static
   * @param {string} endpoint - The API endpoint.
   * @param {Object} data - The data to be sent in the request body.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static patch(endpoint, data) {
    /**
     * Implementation details...
     */
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

  /**
   * Make a DELETE request to the specified API endpoint.
   * @static
   * @param {string} endpoint - The API endpoint.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static delete(endpoint) {
    /**
     * Implementation details...
     */
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
