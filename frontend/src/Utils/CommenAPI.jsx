import APIManager from './APIManager';

export default class CommonAPI {
  static getCurrentUser = () => APIManager.get('/auth/users/me/');
}
