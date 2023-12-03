import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  'Content-Type': 'application/json',
});

export default class AuthAPI {
  static post(endpoint, data) {
    return client.post(endpoint, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error in POST request to ${endpoint}:`, error);
      });
  }

  static signup = (data) => this.post('/auth/users/', data);

  static activation = (data) => this.post('/auth/users/activation/', data);

  static login = (data) => this.post('/auth/jwt/create/', data);

  static verifyCurrentUser = (data) => this.post('/auth/jwt/verify/', data);

  static resetPassword = (data) => this.post('/auth/users/reset_password/', data);

  static resetPasswordConfirm = (data) => this.post('/auth/users/reset_password_confirm/', data);
}
