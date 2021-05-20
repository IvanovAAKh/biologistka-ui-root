const getHeaders = () => ({
  Accept: 'application/json',
  Authorization: localStorage.getItem('token'),
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

export const getJson = ({ params, url }) => {
  return fetchGet({
    params,
    url
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .then(errors => {
        throw errors;
      });
  });
};

export const get = ({ params, url }) => {
  return fetchGet({
    params,
    url
  }).then((response) => {
    if (response.ok) {
      return response.text();
    }
    return Promise.reject();
  });
};

export const post = ({ body, params, url }) => {
  return fetchPost({
    body,
    params,
    url,
  }).then((response) => {
    if (response.ok) {
      return response.text();
    }
    return Promise.reject();
  });
};

export const postJson = ({ body, params, url }) => {
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
};