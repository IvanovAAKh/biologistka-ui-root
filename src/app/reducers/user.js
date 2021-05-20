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

const initialState = {
  authorities: [],
  email: '',
  errors: [],
  firstName: '',
  isAuthorised: false,
  isFailedFetchUser: false,
  isFailedSignOut: false,
  isFailedUpdateToken: false,
  isFetchingUpdateToken: false,
  isFetchingUser: false,
  isFetchingSignOut: false,
  lastName: '',
  login: '',
  phone: '',
  tokenExpirationTime: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR_RECEIVE_USER: {
      const {
        errors,
      } = action;

      return {
        ...state,
        errors,
        isFailedFetchUser: true,
        isFetchingUser: false,
      };
    }

    case ERROR_SIGN_OUT: {
      const {
        errors,
      } = action;

      return {
        ...state,
        errors,
        isFailedSignOut: true,
        isFetchingSignOut: false,
      };
    }

    case ERROR_UPDATE_TOKEN: {
      const {
        errors,
      } = action;

      return {
        ...initialState,
        errors,
        isFailedUpdateToken: true,
        isFetchingUpdateToken: false,
      };
    }

    case RECEIVE_USER: {
      const {
        authorities,
        email,
        firstName,
        lastName,
        login,
        phone,
        tokenExpirationTime,
      } = action.user;

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
        tokenExpirationTime: tokenExpirationTime
          || initialState.tokenExpirationTime,
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

    case REQUEST_UPDATE_TOKEN: {
      return {
        ...state,
        errors: initialState.errors,
        isFailedUpdateToken: false,
        isFetchingUpdateToken: true,
      };
    }

    case REQUEST_USER: {
      return {
        ...state,
        errors: initialState.errors,
        isFailedFetchUser: true,
        isFetchingUser: true,
      };
    }

    case SUCCESS_SIGN_OUT: {
      return initialState;
    }

    case SUCCESS_UPDATE_TOKEN: {
      const {
        tokenExpirationTime,
      } = action.payload;

      return {
        ...state,
        errors: initialState.errors,
        isFailedUpdateToken: false,
        isFetchingUpdateToken: false,
        tokenExpirationTime,
      };
    }

    default: {
      return state;
    }
  }
}