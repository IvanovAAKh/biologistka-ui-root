import {
  ERROR_REFRESH_TOKEN,
  WRONG_TOKEN,
} from 'constants/globalActionTypes';

import {
  CLEAR_ERRORS,
  ERROR_RECEIVE_USER,
  ERROR_SIGN_IN,
  ERROR_SIGN_OUT,
  ERROR_SIGN_UP,
  RECEIVE_USER,
  REQUEST_SIGN_OUT,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_UP,
  REQUEST_USER,
  SUCCESS_SIGN_IN,
  SUCCESS_SIGN_OUT,
  SUCCESS_SIGN_UP,
} from '../constants/actionTypes';

const initialState = {
  authorities: [],
  email: '',
  errors: [],
  firstName: '',
  isAuthorised: false,
  isFailedFetchUser: false,
  isFailedSignUp: false,
  isFailedSignOut: false,
  isFetchingUser: false,
  isFetchingSignOut: false,
  isFetchingSignUp: false,
  lastName: '',
  login: '',
  phone: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS: {
      return {
        ...state,
        errors: initialState.errors,
        isFailedFetchUser: false,
        isFailedSignUp: false,
        isFailedSignOut: false,
        isFailedUpdateToken: false,
      };
    }

    case WRONG_TOKEN:
    case ERROR_REFRESH_TOKEN: {
      return initialState;
    }

    case ERROR_RECEIVE_USER:
    case ERROR_SIGN_IN: {
      return {
        ...state,
        errors: action.payload,
        isFailedFetchUser: true,
        isFetchingUser: false,
      };
    }

    case ERROR_SIGN_OUT: {
      return {
        ...state,
        errors: action.payload,
        isFailedSignOut: true,
        isFetchingSignOut: false,
      };
    }

    case ERROR_SIGN_UP: {
      return {
        ...state,
        errors: action.payload,
        isFailedSignUp: true,
        isFetchingSignUp: false,
      };
    }

    case RECEIVE_USER:
    case SUCCESS_SIGN_IN: {
      const {
        authorities,
        email,
        firstName,
        lastName,
        login,
        phone,
      } = action.payload;

      return {
        ...state,
        authorities: authorities || initialState.authorities,
        email: email || initialState.email,
        errors: initialState.errors,
        firstName: firstName || initialState.firstName,
        isAuthorised: true,
        isFailedFetchUser: false,
        isFetchingUser: false,
        lastName: lastName || initialState.lastName,
        login: login || initialState.login,
        phone: phone || initialState.phone,
      };
    }

    case REQUEST_SIGN_OUT: {
      return {
        ...state,
        errors: initialState.errors,
        isFailedSignOut: false,
        isFetchingSignOut: true,
      };
    }

    case REQUEST_SIGN_UP: {
      return {
        ...state,
        errors: initialState.errors,
        isFailedSignUp: false,
        isFetchingSignUp: true,
      };
    }

    case REQUEST_SIGN_IN:
    case REQUEST_USER: {
      return {
        ...state,
        errors: initialState.errors,
        isFailedFetchUser: false,
        isFetchingUser: true,
      };
    }

    case SUCCESS_SIGN_OUT: {
      return initialState;
    }

    case SUCCESS_SIGN_UP: {
      return {
        ...state,
        errors: initialState.errors,
        isFailedSignUp: false,
        isFetchingSignUp: false,
      };
    }

    default: {
      return state;
    }
  }
}