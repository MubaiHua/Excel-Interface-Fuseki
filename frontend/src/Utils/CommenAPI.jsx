import APIManager from './APIManager';

/**
 * Utility class for making common API requests.
 * @class CommonAPI
 */
export default class CommonAPI {
  /**
   * Get information about the current user.
   * @static
   * @returns {Promise} A Promise that resolves to the response data.
   */
  static getCurrentUser = () => APIManager.get('/auth/users/me/');
}
