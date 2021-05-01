import {
  ERROR_RECEIVE_USER,
  ERROR_SIGN_OUT,
  RECEIVE_USER,
  REQUEST_SIGN_OUT,
  REQUEST_USER,
  SUCCESS_SIGN_OUT,
} from '../constants/actionTypes';

const initialState = {
  authorities: [],
  email: '',
  errorType: null,
  initials: '',
  isAuthorised: false,
  isFetchingUser: false,
  isFetchingSignOut: false,
  name: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR_RECEIVE_USER: {
      const {
        errorType,
      } = action;

      return {
        ...state,
        errorType,
        isFetching: false,
      };
    }

    case ERROR_SIGN_OUT: {
      const {
        errorType,
      } = action;

      return {
        ...state,
        errorType,
        isFetchingSignOut: false,
      };
    }

    case RECEIVE_USER: {
      const {
        email,
      } = action.user;

      return {
        ...state,
        isAuthorised: true,
        isFetching: false,
        email,
      };
    }

    case REQUEST_SIGN_OUT: {
      return {
        ...state,
        errorType: initialState,
        isFetchingSignOut: true,
      };
    }

    case REQUEST_USER: {
      return {
        ...state,
        errorType: initialState.errorType,
        isFetching: true,
      };
    }

    case SUCCESS_SIGN_OUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}