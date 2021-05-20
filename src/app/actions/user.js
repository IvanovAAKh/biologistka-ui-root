import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {
  getJson,
  postJson,
} from 'utils/requests';
import {
  TOKEN_EXPIRED,
} from '../constants/errorCodes';
import config from 'config';

import {
  ERROR_RECEIVE_USER,
  ERROR_SIGN_OUT,
  ERROR_UPDATE_TOKEN,
  RECEIVE_USER,
  REQUEST_SIGN_OUT,
  REQUEST_UPDATE_TOKEN,
  REQUEST_USER,
  SUCCESS_SIGN_OUT,
  SUCCESS_UPDATE_TOKEN,
} from '../constants/actionTypes';

const errorReceiveUser = errors => ({
  errors,
  type: ERROR_RECEIVE_USER,
});

const getUser = () => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return getJson({
    url: `${BASE_URL}${USERS_SERVICE}/user/get`,
  });
};

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const requestUser = () => ({
  type: REQUEST_USER,
});

export const fetchUser = () => (dispatch) => {
  if (localStorage.getItem('token')) {
    dispatch(requestUser());
    return getUser()
      .then(user => dispatch(receiveUser(user)))
      .catch((errors) => {
        const isTokenExpired = errors
          .find(({ code }) => code === TOKEN_EXPIRED);
        if (isTokenExpired) {
          localStorage.removeItem('token');
        }
        dispatch(errorReceiveUser(errors));
      });
  }
};

const signIn = ({
  clientId,
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
    url: `${BASE_URL}${USERS_SERVICE}/user/signIn`,
  });
};

export const fetchSignIn = ({
  login,
  password,
}) => (dispatch) => {
  dispatch(requestUser());
  const storedClientId = localStorage.getItem('clientId');
  const clientIdPromise = storedClientId
    ? Promise.resolve(storedClientId)
    : FingerprintJS.load()
      .then(fp => fp.get())
      .then(({ visitorId }) => {
        localStorage.setItem('clientId', visitorId);
        return visitorId;
      });
  return clientIdPromise
    .then((clientId) => {
      return signIn({
        clientId,
        login,
        password,
      }).then((user) => {
        localStorage.setItem('token', user.token);
        dispatch(receiveUser(user));
      }).catch(errors => dispatch(errorReceiveUser(errors)));
    });
};

const errorSignOut = errors => ({
  errors,
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
    url: `${BASE_URL}${USERS_SERVICE}/signOut`,
  });
};

export const fetchSignOut = () => (dispatch) => {
  dispatch(requestSignOut());
  return signOut()
    .then(() => {
      localStorage.removeItem('token');
      dispatch(successSignOut());
    })
    .catch(errors => dispatch(errorSignOut(errors)))
};

const errorUpdateToken = errors => ({
  errors,
  type: ERROR_UPDATE_TOKEN,
});

const requestUpdateToken = () => ({
  type: REQUEST_UPDATE_TOKEN,
});

const successUpdateToken = payload => ({
  payload,
  type: SUCCESS_UPDATE_TOKEN,
});

const updateToken = ({
  clientId,
}) => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return postJson({
    body: {
      clientId,
    },
    url: `${BASE_URL}${USERS_SERVICE}/updateToken`,
  });
};

export const fetchUpdateToken = () => (dispatch) => {
  dispatch(requestUpdateToken());
  return updateToken({
    clientId: localStorage.getItem('clientId'),
  }).then((response) => {
    const {
      token,
    } = response;
    localStorage.setItem('token', token);
    dispatch(successUpdateToken(response));
  }).catch((errors) => {
    localStorage.removeItem('token');
    dispatch(errorUpdateToken(errors));
  });
};
