import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import IconButton from 'components/IconButton';
import IconVisibility from 'components/icons/Visibility';
import IconVisibilityOff from 'components/icons/VisibilityOff';
import React, { useState } from 'react';
import Tab from 'components/Tab';
import TabContent from 'components/TabContent';
import Tabs from 'components/Tabs';
import TabsContent from 'components/TabsContent';
import TextField from 'components/TextField';
import Typography from 'components/Typography';

const getClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
  },
  paddingTop3x: {
    paddingTop: '24px',
  },
}));

const AVAILABLE_TABS = {
  login: "login",
  register: "register"
};

const AuthorizationForm = () => {
  const classes = getClasses();

  const [selectedTab, setSelectedTab] = useState(AVAILABLE_TABS.login);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { formatMessage } = useIntl();

  return (
    <div className={classes.container}>
      <Tabs
        fullWidth
        onChange={(event, newValue) => setSelectedTab(newValue)}
        value={selectedTab}
      >
        <Tab
          label={formatMessage({
            id: 'signIn',
          })}
          value={AVAILABLE_TABS.login}
        />
        <Tab
          label={formatMessage({
            id: 'signUp',
          })}
          value={AVAILABLE_TABS.register}
        />
      </Tabs>
      <TabsContent value={selectedTab}>
        <TabContent value={AVAILABLE_TABS.login}>
          <div className={classes.tabContent}>
            <TextField
              autoFocus
              label={formatMessage({
                id: 'login',
              })}
              onChange={({ target }) => setLogin(target.value)}
              value={login}
            />
            <div
              className={classNames(
                classes.fullWidth,
                classes.paddingTop3x,
              )}
            >
              <TextField
                AdornmentEnd={(
                  <IconButton
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible
                      ? (<IconVisibility />)
                      : (<IconVisibilityOff />)}
                  </IconButton>
                )}
                inputType={isPasswordVisible ? 'text' : 'password'}
                label={formatMessage({
                  id: 'password',
                })}
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
            </div>
          </div>
        </TabContent>
        <TabContent value={AVAILABLE_TABS.register}>
          Register
        </TabContent>
      </TabsContent>
    </div>
  )
};

export default AuthorizationForm;