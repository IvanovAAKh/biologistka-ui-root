import {
  ERROR_RECEIVE_,
  RECEIVE_,
  REQUEST_,
} from '../constants/actionTypes';

const initialState = {
  isFailed: false,
  isFetching: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ERROR_RECEIVE_: {
      return {
        ...state,
        isFailed: true,
        isFetching: false,
      };
    }

    case RECEIVE_: {
      const {
      } = payload;

      return {
        ...state,
        isFailed: false,
        isFetching: false,
      };
    }

    case REQUEST_: {
      return {
        ...state,
        isFailed: false,
        isFetching: true,
      };
    }

    default: return state;
  }
}