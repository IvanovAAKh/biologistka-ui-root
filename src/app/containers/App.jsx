import React, { useEffect } from 'react';
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
import PageAboutUs from 'pageProviders/AboutUs';
import PageMain from 'pageProviders/Main';
import PageWorkbooks from 'pageProviders/Workbooks';
import TokenUpdater from 'components/TokenUpdater';
import MUI_THEME from 'constants/muiTheme';
import * as PAGES from 'constants/pages';
import useActions from 'hooks/useActions';

import * as userActions from '../actions/user';

export default () => {
  const {
    fetchUser,
  } = useActions(userActions);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ThemeProvider theme={createMuiTheme(MUI_THEME)}>
      <Router>
        <IntlProvider>
          <TokenUpdater />
          <Header />
          <Switch>
            <Route path={`/${PAGES.MAIN}`}>
              <PageMain />
            </Route>
            <Route path={`/${PAGES.ABOUT_ME}`}>
              <PageAboutUs />
            </Route>
            <Route path={`/${PAGES.WORKBOOKS}`}>
              <PageWorkbooks />
            </Route>
            <Redirect from="*" to={`/${PAGES.MAIN}`} />
          </Switch>
        </IntlProvider>
      </Router>
    </ThemeProvider>
  );
}
