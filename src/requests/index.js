import {
  clearToken,
  clearTokenExpirationTime,
  clearTokenRefreshKey,
  getRefreshTokenRequestBody,
  getRefreshTokenRequestURL,
  getToken,
  getTokenRefreshKey,
  setToken,
  setTokenRefreshKey,
  setTokenExpirationTime,
} from 'token';
import * as globalActionTypes from 'constants/globalActionTypes';

const BE_ERROR_CODES = {
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  WRONG_TOKEN_FORMAT: 'WRONG_TOKEN_FORMAT',
};

const hasTokenExpiredError = (errors) => errors
  .some(({ code }) => code === BE_ERROR_CODES.TOKEN_EXPIRED);

const hasInvalidTokenError = (errors) => errors
  .some(({ code }) => [
    BE_ERROR_CODES.USER_NOT_FOUND,
    BE_ERROR_CODES.WRONG_TOKEN_FORMAT,
  ].includes(code));


const getHeaders = () => ({
  Accept: 'application/json',
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

const fetchGet = ({ params = {}, url }) => {
  url = new URL(url);
  url.search = new URLSearchParams(params).toString();
  return fetch(
    url,
    {
      headers: getHeaders(),
      method: 'GET',
    }
  );
};

const fetchPost = ({ body, params = {}, url }) => {
  url = new URL(url);
  url.search = new URLSearchParams(params).toString();

  return fetch(
    url,
    {
      body: JSON.stringify(body),
      headers: getHeaders(),
      method: 'POST',
    }
  );
};

const clearTokenData = () => {
  clearToken();
  clearTokenRefreshKey();
  clearTokenExpirationTime();
};

export const fetchRefreshToken = () => (dispatch) => {
  return fetchPost({
    body: getRefreshTokenRequestBody(),
    url: getRefreshTokenRequestURL(),
  }).then((response) => {
    if (response.ok) {
      return response.json()
        .then(({
          token,
          tokenExpirationTime,
          tokenRefreshKey,
        }) => {
          setToken(token);
          setTokenRefreshKey(tokenRefreshKey);
          setTokenExpirationTime(tokenExpirationTime,);
        });
    }
    clearTokenData();
    dispatch({
      type: globalActionTypes.ERROR_REFRESH_TOKEN,
    });
    return response.json()
      .then(errors => {
        throw errors;
      })
  })
};

export const getJson = ({
  dispatch = () => {},
  params,
  url,
}) => {
  return fetchGet({
    params,
    url,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .then((errors) => {
        if (hasTokenExpiredError(errors)) {
          const tokenRefreshKey = getTokenRefreshKey();
          if (!tokenRefreshKey) {
            throw errors;
          }
          return fetchRefreshToken()(dispatch)
            .then(() => {
              return fetchGet({
                params,
                url,
              }).then((response) => {
                if (response.ok) {
                  return response.json();
                }
                return response.json()
                  .then(errors => {
                    throw errors;
                  });
              });
            });
        }
        if (hasInvalidTokenError(errors)) {
          clearTokenData();
          dispatch({
            type: globalActionTypes.WRONG_TOKEN,
          })
        }
        throw errors;
      });
  });
};

// export const get = ({ params, url }) => {
//   return fetchGet({
//     params,
//     url
//   }).then((response) => {
//     if (response.ok) {
//       return response.text();
//     }
//     return Promise.reject();
//   });
// };

// export const post = ({ body, params, url }) => {
//   return fetchPost({
//     body,
//     params,
//     url,
//   }).then((response) => {
//     if (response.ok) {
//       return response.text();
//     }
//     return Promise.reject();
//   });
// };

export const postJson = ({
  body,
  dispatch = () => {},
  params,
  url,
}) => {
  return fetchPost({
    body,
    params,
    url,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .then((errors) => {
        if (hasTokenExpiredError(errors)) {
          const tokenRefreshKey = getTokenRefreshKey();
          if (!tokenRefreshKey) {
            throw errors;
          }
          return fetchRefreshToken()(dispatch)
            .then(() => {
              return fetchPost({
                body,
                params,
                url,
              }).then((response) => {
                if (response.ok) {
                  return response.json();
                }
                return response.json()
                  .then(errors => {
                    throw errors;
                  });
              });
            });
        }
        if (hasInvalidTokenError(errors)) {
          clearTokenData();
          dispatch({
            type: globalActionTypes.WRONG_TOKEN,
          })
        }
        throw errors;
      });
  });
};