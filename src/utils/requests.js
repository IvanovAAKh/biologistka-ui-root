const fetchGet = ({ params = {}, url }) => {
  url = new URL(url);
  url.search = new URLSearchParams(params).toString();
  return fetch(url);
};

const fetchPost = ({ body, params = {}, url }) => {
  url = new URL(url);
  url.search = new URLSearchParams(params).toString();

  return fetch(
    url,
    {
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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
    return Promise.reject();
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
    return Promise.reject();
  });
};