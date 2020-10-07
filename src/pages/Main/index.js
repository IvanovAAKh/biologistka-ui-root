import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'utils/configureStore';

import Main from './container/Main';
import rootReducer from './reducers/index';

const store = configureStore(rootReducer);

export default (props) => (
  <Provider store={store}>
    <Main {...props} />
  </Provider>
)