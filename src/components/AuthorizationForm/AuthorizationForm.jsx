import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import React, { useState } from 'react';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import Typography from 'components/Typography';

const getClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const AVAILABLE_TABS = {
  login: "login",
  register: "register"
};

const AuthorizationForm = () => {
  const classes = getClasses();
  const [selectedTab, setSelectedTab] = useState(AVAILABLE_TABS.login);
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
            id: 'login',
          })}
          value={AVAILABLE_TABS.login}
        />
        <Tab
          label={formatMessage({
            id: 'register',
          })}
          value={AVAILABLE_TABS.register}
        />
      </Tabs>
    </div>
  )
};

export default AuthorizationForm;