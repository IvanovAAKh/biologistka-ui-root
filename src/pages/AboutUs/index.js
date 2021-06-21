import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'utils/configureStore';

import AboutUs from './container/AboutUs';
import rootReducer from './reducers';

const store = configureStore(rootReducer);

export default (props) => (
  <Provider store={store}>
    <AboutUs {...props} />
  </Provider>
)