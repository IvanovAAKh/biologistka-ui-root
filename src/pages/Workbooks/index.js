import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'utils/configureStore';

import Workbooks from './container/Workbooks';
import rootReducer from './reducers';

const store = configureStore(rootReducer);

export default (props) => (
  <Provider store={store}>
    <Workbooks {...props} />
  </Provider>
)