import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Button from 'components/Button';
import Dialog from 'components/Dialog';
import DialogContent from 'components/DialogContent';
import DialogTitle from 'components/DialogTitle';
import IconButton from 'components/IconButton';
import IconMenu from 'components/icons/Menu';
import Logo from 'components/Logo';
import LeftNavPanel from 'components/LeftNavPanel';
import Typography from 'components/Typography';
import useActions from 'hooks/useActions';
import useLocationSearch from 'hooks/useLocationSearch';
import useScreenSize from 'hooks/useScreenSize';
import useUser from 'hooks/useUser';
import * as COLORS from 'constants/colors';
import * as LANGUAGES from 'constants/languages';
import * as userActions from 'app/actions/user';
import AuthorizationForm from 'components/AuthorizationForm';
import * as screenSizeTypes from "constants/screenSizeTypes";
import {
  HEADER_HEIGHT,
} from 'constants/sizes';

const getClasses = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    background: COLORS.HEADER,
    boxShadow: '0px 0px 6px 0px',
    display: 'flex',
    justifyContent: 'space-between',
    maxHeight: `${HEADER_HEIGHT - 16}px`,
    padding: '8px 16px',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  iconButtonContainer: {},
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
  const history = useHistory();
  const { formatMessage } = useIntl();
  const {
    fetchSignIn,
    fetchSignOut,
  } = useActions(userActions);
  const user = useUser();
  const screenSize = useScreenSize();

  const [leftMenuOptions, setLeftMenuOptions] = useState({
    opened: false,
  });
  const [authDialogOpened, setAuthDialogOpened] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.toolBarContainerLeft}>
        {[
          screenSizeTypes.EXTRA_SMALL,
          screenSizeTypes.SMALL,
          screenSizeTypes.MEDIUM,
        ].includes(screenSize) && (
          <div className={classes.iconButtonContainer}>
            <IconButton
              borderColor={null}
              onClick={() => setLeftMenuOptions({
                ...leftMenuOptions,
                opened: true,
              })}
            >
              <IconMenu />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              disableSwipeToOpen
              disableDiscovery
              disableBackdropTransition
              open={leftMenuOptions.opened}
              onClose={() => setLeftMenuOptions({
                ...leftMenuOptions,
                opened: false,
              })}
              onOpen={() => {}}
            >
              <LeftNavPanel
                onChange={() => setLeftMenuOptions({
                  ...leftMenuOptions,
                  opened: false,
                })}
              />
            </SwipeableDrawer>
          </div>
        )}
        <div className={classes.paddingLeft2x}>
          <Logo />
        </div>
      </div>
      <div className={classes.toolBarContainerRight}>
        {!user.isAuthorized && (
          <Button
            onClick={() => setAuthDialogOpened(true)}
            size="small"
            variant="main"
          >
            <Typography
              color="inherit"
              variant="button"
            >
              {formatMessage({ id: 'login' })}
            </Typography>
          </Button>
        )}
        {authDialogOpened && (
          <Dialog
            onClose={() => setAuthDialogOpened(false)}
            width="extraSmall"
          >
            <DialogTitle
              onClose={() => setAuthDialogOpened(false)}
            />
            <DialogContent>
              <AuthorizationForm
                onSuccess={() => setAuthDialogOpened(false)}
              />
            </DialogContent>
          </Dialog>
        )}
        {user.isAuthorized && (
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
            value={lang}
            onChange={({ target }) => history.replace({
              pathname: history.location.pathname,
              search: `?${new URLSearchParams({
                ...locationSearch,
                lang: target.value,
              }).toString()}`,
            })}
          >
            {Object
              .keys(LANGUAGES)
              .map(langCode => (
                <MenuItem
                  key={langCode}
                  value={langCode}
                >
                  <Typography>
                    {INTERFACE_LANGUAGES[langCode]}
                  </Typography>
                </MenuItem>
              ))}
          </Select>
        </div>
      </div>
    </div>
  )
};

export default Header;