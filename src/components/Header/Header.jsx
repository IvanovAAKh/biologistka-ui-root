import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Button from 'components/Button';
import IconButton from 'components/IconButton';
import IconMenu from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slide from '@material-ui/core/Slide';

import Dialog from 'components/Dialog';
import DialogContent from 'components/DialogContent';
import DialogTitle from 'components/DialogTitle';
import Logo from 'components/Logo';
import LeftNavBar from 'components/LeftNavBar';
import Typography from 'components/Typography';
import useActions from 'hooks/useActions';
import useLocationSearch from 'hooks/useLocationSearch';
import useUser from 'hooks/useUser';
import * as COLORS from 'constants/colors';
import * as LANGUAGES from 'constants/languages';
import * as userActions from 'app/actions/user';
import AuthorizationForm from 'components/AuthorizationForm';

const getClasses = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    background: COLORS.GOLDEN._10,
    display: 'flex',
    justifyContent: 'space-between',
    height: '48px',
    paddingLeft: `${theme.spacing(2)}px`,
    paddingRight: `${theme.spacing(2)}px`,
    position: 'sticky',
    top: 0,
  },
  iconButtonContainer: {
    marginLeft: `-${theme.spacing(2)}px`,
  },
  icon: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '24px',
    width: '24px',
  },
  paddingLeft: {
    paddingLeft: `${theme.spacing(1)}px`,
  },
  paddingLeft2x: {
    paddingLeft: `${theme.spacing(2)}px`,
  },
  toolBarContainerLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  toolBarContainerRight: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const INTERFACE_LANGUAGES = {
  en: 'Eng',
  ru: 'Рус',
  ua: 'Укр',
};

const Header = () => {
  const classes = getClasses();
  const locationSearch = useLocationSearch();
  const {
    lang,
  } = locationSearch;
  const [leftMenuOptions, setLeftMenuOptions] = useState({
    opened: false,
  });
  const [authDialogOpened, setAuthDialogOpened] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(lang);
  const history = useHistory();
  const scrollTrigger = useScrollTrigger({threshold: 48});
  const { formatMessage } = useIntl();
  const {
    fetchSignIn,
    fetchSignOut,
  } = useActions(userActions);
  const user = useUser();
  console.log(user);
  return (
    <Slide
      appear={false}
      direction="down"
      in={!scrollTrigger}
    >
      <div className={classes.container}>
        <div className={classes.toolBarContainerLeft}>
          <div className={classes.iconButtonContainer}>
            <IconButton
              onClick={() => setLeftMenuOptions({
                ...leftMenuOptions,
                opened: true,
              })}
            >
              <IconMenu className={classes.icon} />
            </IconButton>
            <LeftNavBar
              opened={leftMenuOptions.opened}
              onClose={() => setLeftMenuOptions({
                ...leftMenuOptions,
                opened: false,
              })}
            />
          </div>
          <div className={classes.paddingLeft2x}>
            <Logo />
          </div>
        </div>
        <div className={classes.toolBarContainerRight}>
          {!user.isAuthorised && (
            <Button
              onClick={() => setAuthDialogOpened(true)}
              size="small"
            >
              <Typography variant="button">
                {formatMessage({ id: 'login' })}
              </Typography>
            </Button>
          )}
          {authDialogOpened && (
            <Dialog
              onClose={() => setAuthDialogOpened(false)}
            >
              <DialogTitle
                onClose={() => setAuthDialogOpened(false)}
              />
              <DialogContent>
                <AuthorizationForm />
              </DialogContent>
            </Dialog>
          )}
          {user.isAuthorised && (
            <Button
              onClick={() => fetchSignOut()}
              size="small"
            >
              <Typography variant="button">
                {user.firstName || user.login}
              </Typography>
            </Button>
          )}
          <div className={classes.paddingLeft}>
            <Select
              focusable={false}
              value={selectedLanguage}
              onChange={({ target }) => {
                setSelectedLanguage(target.value);
                history.replace({
                  pathname: history.location.pathname,
                  search: `?${new URLSearchParams({
                    ...locationSearch,
                    lang: target.value,
                  }).toString()}`,
                });
              }}
            >
              {Object
                .keys(LANGUAGES)
                .map(langCode => (
                  <MenuItem
                    key={langCode}
                    value={langCode}
                  >
                    <Typography color="textPrimary">
                      {INTERFACE_LANGUAGES[langCode]}
                    </Typography>
                  </MenuItem>
                ))}
            </Select>
          </div>
        </div>
      </div>
    </Slide>
  )
};

export default Header;