import {
  getJson,
  postJson,
} from 'utils/requests';
import config from 'config';

import {
  ERROR_RECEIVE_USER,
  ERROR_SIGN_OUT,
  RECEIVE_USER,
  REQUEST_SIGN_OUT,
  REQUEST_USER,
  SUCCESS_SIGN_OUT,
} from '../constants/actionTypes';

const errorReceiveUser = errorType => ({
  errorType,
  type: ERROR_RECEIVE_USER,
});

const getUser = () => {
  const {
    BASE_URL,
  } = config;

  return getJson({
    url: `${BASE_URL}/user/get`,
  }).catch(() => Promise.resolve({email: 'IvanovAAKh@gmail.com'}));
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
      .catch((err) => {
        if ((err || {}).type === 'TOKEN_EXPIRED') {
          localStorage.removeItem('token');
        }
        dispatch(errorReceiveUser((err || {}).type || err));
      });
  }
};

const signIn = ({
  login,
  password,
}) => {
  const {
    BASE_URL,
  } = config;

  return postJson({
    body: {
      login,
      password,
    },
    url: `${BASE_URL}/signIn`,
  }).catch(() => Promise.resolve({user: {email: 'IvanovAAKh@gmail.com'}, token: 'asda134r13g13g13h1'}));
};

export const fetchSignIn = ({
  login,
  password,
}) => (dispatch) => {
  dispatch(requestUser());

  return signIn({
    login,
    password,
  }).then(({ token, user }) => {
    localStorage.setItem('token', token);
    dispatch(receiveUser(user));
  }).catch(err => dispatch(errorReceiveUser((err || {}).type || err)));
};

const errorSignOut = errorType => ({
  errorType,
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
  } = config;

  return postJson({
    url: `${BASE_URL}/signOut`,
  }).catch(() => Promise.resolve());
};

export const fetchSignOut = () => (dispatch) => {
  dispatch(requestSignOut());
  return signOut()
    .then(() => {
      localStorage.removeItem('token');
      dispatch(successSignOut());
    }).catch((err) => dispatch(errorSignOut((err || {}).type || err)))
};
