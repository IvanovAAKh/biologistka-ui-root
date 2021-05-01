import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'utils/configureStore';

import App from './containers/App';
import rootReducer from './reducers';
const store = configureStore(rootReducer);

export default () => (
  <Provider store={store} >
    <App />
  </Provider>
)