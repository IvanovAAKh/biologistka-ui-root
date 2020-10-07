import {
  ERROR_RECEIVE_,
  RECEIVE_,
  REQUEST_,
} from '../constants/actionTypes';

import {
  postJson
} from 'utils/requests';
import config from 'constants/config';

export const errorReceive = () => ({
  type: ERROR_RECEIVE_,
});

export const receive = ({
}) => ({
  payload: {
  },
  type: RECEIVE_,
});

export const request = () => ({
  type: REQUEST_,
});

export const get = ({

}) => {
  const {
    BASE_URL,
  } = config;

  return postJson({
    url: `${BASE_URL}/`,
    body: {
    },
  })
};

export const fetch = ({
}) => (dispatch) => {
  dispatch(request());
  get({
  }).then(() => {
    dispatch(receive({
    }));
  }).catch(() => dispatch(errorReceive()));
};
