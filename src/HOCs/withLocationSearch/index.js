import React from 'react';
import {
  Redirect,
  useLocation,
} from 'react-router-dom';
import * as LANGUAGES from 'constants/languages';

const DEFAULT_LOCATION_SEARCH = {
  lang: LANGUAGES.EN,
};

const searchToObject = (search) => {
  const params = new URLSearchParams(search);
  let result = {};
  for(let param of params) { // each 'entry' is a [key, value] tupple
    const [key, value] = param;
    result[key] = value;
  }
  return result;
};

const getInvalidLocationSearchParams = (locationSearch) => {
  const {
    lang,
  } = locationSearch;
  const invalidParams = [];

  if (!Object.keys(LANGUAGES).includes(lang)) {
    invalidParams.push('lang');
  }

  return invalidParams;
};

const getValidLocationSearch = (inputLocationSearch, invalidLocationSearchParams) => {
  const validLocationSearch = {
    ...DEFAULT_LOCATION_SEARCH,
    ...(inputLocationSearch || {}),
  };
  invalidLocationSearchParams
    .forEach(invalidParamKey => validLocationSearch[invalidParamKey] = DEFAULT_LOCATION_SEARCH[invalidParamKey]);
  return validLocationSearch;
};

const withLocationSearch = (Component) => (props) => {
  const {
    pathname,
    search,
  } = useLocation();

  const locationSearch = searchToObject(search);
  const invalidLocationSearchParams = getInvalidLocationSearchParams(locationSearch);

  return !invalidLocationSearchParams.length
    ? (
      <Component
        locationSearch={locationSearch}
        {...props}
      />
    )
    : (
      <Redirect
        to={{
          pathname,
          search: `?${new URLSearchParams(getValidLocationSearch(locationSearch, invalidLocationSearchParams)).toString()}`,
        }}
      />
    )
};

export default withLocationSearch;