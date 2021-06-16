import config from 'config';

const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  TOKEN_REFRESH_KEY: 'tokenRefreshKey',
  TOKEN_EXPIRATION_TIME: 'tokenExpirationTime',
};

export const getToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
};

export const setToken = (token) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
};

export const clearToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
};

export const getTokenRefreshKey = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_REFRESH_KEY);
};

export const setTokenRefreshKey = (key) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_REFRESH_KEY, key);
};

export const clearTokenRefreshKey = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_REFRESH_KEY);
};

export const getTokenExpirationTime = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_EXPIRATION_TIME);
};

export const setTokenExpirationTime = (time) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_EXPIRATION_TIME, time);
};

export const clearTokenExpirationTime = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_EXPIRATION_TIME);
};

export const getRefreshTokenRequestBody = () => ({
  tokenRefreshKey: getTokenRefreshKey(),
});

export const getRefreshTokenRequestURL = () => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;
  return `${BASE_URL}${USERS_SERVICE}/user/updateToken`;
};
