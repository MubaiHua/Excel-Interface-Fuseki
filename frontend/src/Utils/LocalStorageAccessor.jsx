const DEFAULT_JWT_TOKEN = 'djwt';
const DEFAULT_JWT_REFRESH_TOKEN = 'djwtr';

// localstorage keys
export const JWT_TOKEN = 'jwtToken';
export const JWT_REFRESH_TOKEN = 'jwtRefreshToken';

export const getJWTToken = () => {
  const jwt = localStorage.getItem(JWT_TOKEN);
  return jwt === undefined || jwt === null ? DEFAULT_JWT_TOKEN : JSON.parse(jwt);
};

export const getJWTRefreshToken = () => {
  const jwt = localStorage.getItem(JWT_REFRESH_TOKEN);
  return jwt === undefined || jwt === null ? DEFAULT_JWT_REFRESH_TOKEN : JSON.parse(jwt);
};

export const cleanJWTToken = () => {
  localStorage.setItem(JWT_TOKEN, JSON.stringify(DEFAULT_JWT_TOKEN));
  localStorage.setItem(JWT_REFRESH_TOKEN, JSON.stringify(DEFAULT_JWT_REFRESH_TOKEN));
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
