const DEFAULT_JWT_TOKEN = 'djwt';
const DEFAULT_JWT_REFRESH_TOKEN = 'djwtr';

// Local Storage keys
export const JWT_TOKEN = 'jwtToken';
export const JWT_REFRESH_TOKEN = 'jwtRefreshToken';

/**
 * Get the JWT token from Local Storage.
 * @returns {string} The JWT token.
 */
export const getJWTToken = () => {
  const jwt = localStorage.getItem(JWT_TOKEN);
  return jwt === undefined || jwt === null ? DEFAULT_JWT_TOKEN : JSON.parse(jwt);
};

/**
 * Get the JWT refresh token from Local Storage.
 * @returns {string} The JWT refresh token.
 */
export const getJWTRefreshToken = () => {
  const jwt = localStorage.getItem(JWT_REFRESH_TOKEN);
  return jwt === undefined || jwt === null ? DEFAULT_JWT_REFRESH_TOKEN : JSON.parse(jwt);
};

/**
 * Clean up JWT tokens in Local Storage.
 */
export const cleanJWTToken = () => {
  localStorage.setItem(JWT_TOKEN, JSON.stringify(DEFAULT_JWT_TOKEN));
  localStorage.setItem(JWT_REFRESH_TOKEN, JSON.stringify(DEFAULT_JWT_REFRESH_TOKEN));
};

/**
 * Set a key-value pair in Local Storage.
 * @param {string} key - The key for the Local Storage entry.
 * @param {any} value - The value to be stored.
 */
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
