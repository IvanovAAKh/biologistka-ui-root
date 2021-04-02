import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import IconButton from '@material-ui/core/IconButton';
import IconMenu from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import Logo from 'components/Logo';
import LeftNavBar from 'components/LeftNavBar';
import useLocationSearch from 'hooks/useLocationSearch';
import * as COLORS from 'constants/colors';
import * as LANGUAGES from 'constants/languages';

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
  const [selectedLanguage, setSelectedLanguage] = useState(lang);
  const history = useHistory();
  const scrollTrigger = useScrollTrigger({threshold: 48});

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
    </Slide>
  )
};

export default Header;