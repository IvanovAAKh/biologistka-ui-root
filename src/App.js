import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import IntlProvider from 'components/IntlProvider';
import Header from 'components/Header';
import PageMain from 'pageProviders/Main';
import MUI_THEME from 'constants/muiTheme';
import * as PAGES from 'constants/pages';

export default () => {
  return (
    <ThemeProvider theme={createMuiTheme(MUI_THEME)}>
      <Router>
        <IntlProvider>
          <Header />
          <Switch>
            <Route path={PAGES.MAIN}>
              <PageMain />
            </Route>
            <Redirect from="*" to={PAGES.MAIN} />
          </Switch>
        </IntlProvider>
      </Router>
    </ThemeProvider>
  );
}
