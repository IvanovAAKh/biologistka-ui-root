import React from 'react';
import * as PAGES from 'constants/pages';

const withAvailablePages = (Component) => (props) => {
  return <Component availablePages={Object.values(PAGES)} {...props} />
};

export default withAvailablePages;