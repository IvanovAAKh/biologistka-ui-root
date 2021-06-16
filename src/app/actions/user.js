import {
  getJson,
  postJson,
} from 'requests';
import {
  clearToken,
  clearTokenRefreshKey,
  clearTokenExpirationTime,
  getToken,
  setToken,
  setTokenRefreshKey,
  setTokenExpirationTime,
} from 'token';
import fetchClientId from 'clientId';
import config from 'config';

import {
  CLEAR_ERRORS,
  ERROR_RECEIVE_USER,
  ERROR_SIGN_IN,
  ERROR_SIGN_OUT,
  ERROR_SIGN_UP,
  RECEIVE_USER,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT,
  REQUEST_SIGN_UP,
  REQUEST_USER,
  SUCCESS_SIGN_IN,
  SUCCESS_SIGN_OUT,
  SUCCESS_SIGN_UP,
} from '../constants/actionTypes';

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

const errorReceiveUser = errors => ({
  payload: errors,
  type: ERROR_RECEIVE_USER,
});

const getUser = ({
  dispatch,
}) => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return getJson({
    dispatch,
    url: `${BASE_URL}${USERS_SERVICE}/user/get`,
  });
};

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user,
});

const requestUser = () => ({
  type: REQUEST_USER,
});

export const fetchUser = () => (dispatch) => {
  if (getToken()) {
    dispatch(requestUser());
    return getUser({
      dispatch,
    }).then(user => dispatch(receiveUser(user)))
      .catch(errors => dispatch(errorReceiveUser(errors)));
  }
};

const errorSignIn = errors => ({
  payload: errors,
  type: ERROR_SIGN_IN,
});

const requestSignIn = () => ({
  type: REQUEST_SIGN_IN,
});

const successSignIn = payload => ({
  payload,
  type: SUCCESS_SIGN_IN,
});

const signIn = ({
  clientId,
  dispatch,
  login,
  password,
}) => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return postJson({
    body: {
      clientId,
      login,
      password,
    },
    dispatch,
    url: `${BASE_URL}${USERS_SERVICE}/user/signIn`,
  });
};

export const fetchSignIn = ({
  login,
  password,
}) => (dispatch) => {
  dispatch(requestSignIn());
  return fetchClientId()
    .then((clientId) => {
      return signIn({
        clientId,
        dispatch,
        login,
        password,
      }).then((response) => {
        setToken(response.token);
        setTokenExpirationTime(response.expirationTime);
        setTokenRefreshKey(response.tokenRefreshKey);
        dispatch(successSignIn(response));
      }).catch(errors => dispatch(errorSignIn(errors)));
    });
};

const errorSignUp = errors => ({
  payload: errors,
  type: ERROR_SIGN_UP,
});

const requestSignUp = () => ({
  type: REQUEST_SIGN_UP,
});

const successSignUp = () => ({
  type: SUCCESS_SIGN_UP,
});

const signUp = ({
  email,
  firstName,
  lastName,
  login,
  password,
  phone,
}) => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return postJson({
    body: {
      email,
      firstName,
      lastName,
      login,
      password,
      phone,
    },
    url: `${BASE_URL}${USERS_SERVICE}/user/signUp`,
  });
};

export const fetchSignUp = ({
  email,
  firstName,
  lastName,
  login,
  password,
  phone,
}) => (dispatch) => {
  dispatch(requestSignUp());
  return signUp({
    email,
    firstName,
    lastName,
    login,
    password,
    phone,
  }).then(() => dispatch(successSignUp()))
    .catch(errors => dispatch(errorSignUp(errors)));
};

export const fetchSignUpAndSignIn = ({
  email,
  firstName,
  lastName,
  login,
  password,
  phone,
}) => (dispatch) => {
  return dispatch(fetchSignUp({
    email,
    firstName,
    lastName,
    login,
    password,
    phone,
  })).then(() => {
    return dispatch(fetchSignIn({
      login,
      password,
    }))
  });
};

const errorSignOut = errors => ({
  payload: errors,
  type: ERROR_SIGN_OUT,
});

const requestSignOut = () => ({
  type: REQUEST_SIGN_OUT,
});

const successSignOut = () => ({
  type: SUCCESS_SIGN_OUT,
});

const signOut = () => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return postJson({
    url: `${BASE_URL}${USERS_SERVICE}/user/signOut`,
  });
};

export const fetchSignOut = () => (dispatch) => {
  dispatch(requestSignOut());
  return signOut()
    .then(() => {
      clearToken();
      clearTokenRefreshKey();
      clearTokenExpirationTime();
      dispatch(successSignOut());
    })
    .catch(errors => dispatch(errorSignOut(errors)))
};

