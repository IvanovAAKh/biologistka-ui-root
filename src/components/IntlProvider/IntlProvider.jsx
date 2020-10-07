import React from 'react';
import {
  IntlProvider as ReactIntlProvider,
} from 'react-intl';

import withLocationSearch from 'HOCs/withLocationSearch';
import getMessages from 'intl';

const IntlProvider = ({
  children,
  locationSearch
}) => {
  const {
    lang,
  } = locationSearch;

  return (
    <ReactIntlProvider  locale={lang} messages={getMessages(lang)}>
      {children}
    </ReactIntlProvider>
  )
};

export default withLocationSearch(IntlProvider);