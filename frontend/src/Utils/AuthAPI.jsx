import axios from 'axios';

/**
 * Axios client for authentication-related API requests.
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  'Content-Type': 'application/json',
});

/**
 * Utility class for making authentication-related API requests.
 * @class AuthAPI
 */
export default class AuthAPI {
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
    return client.post(endpoint, data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(`Error in POST request to ${endpoint}:`, error);
        return error;
      });
  }

  /**
   * Signup a new user.
   * @static
   * @param {Object} data - The data for user signup.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static signup = (data) => this.post('/auth/users/', data);

  /**
   * Activate a user account.
   * @static
   * @param {Object} data - The activation data.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static activation = (data) => this.post('/auth/users/activation/', data);

  /**
   * Log in a user and obtain a JWT token.
   * @static
   * @param {Object} data - The login credentials.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static login = (data) => this.post('/auth/jwt/create/', data);

  /**
   * Verify the current user using a JWT token.
   * @static
   * @param {Object} data - The verification data.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static verifyCurrentUser = (data) => this.post('/auth/jwt/verify/', data);

  /**
   * Initiate the process to reset a user's password.
   * @static
   * @param {Object} data - The data for password reset.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static resetPassword = (data) => this.post('/auth/users/reset_password/', data);

  /**
   * Confirm the reset of a user's password.
   * @static
   * @param {Object} data - The data for password reset confirmation.
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static resetPasswordConfirm = (data) => this.post('/auth/users/reset_password_confirm/', data);
}
