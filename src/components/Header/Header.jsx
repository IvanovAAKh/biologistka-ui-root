import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import {
  useHistory,
} from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import useLocationSearch from 'hooks/useLocationSearch';
import * as COLORS from 'constants/colors';
import * as LANGUAGES from 'constants/languages';

const getClasses = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    background: COLORS.GRAY,
    display: 'flex',
    height: '64px',
    paddingLeft: `${theme.spacing(2)}px`,
    paddingRight: `${theme.spacing(2)}px`,
  },
  logoContainer: {
    minWidth: 'fit-content',
  },
  toolBarContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
}));

const Header = () => {
  const classes = getClasses();
  const locationSearch = useLocationSearch();
  const {
    lang,
  } = locationSearch;
  const [selectedLanguage, setSelectedLanguage] = (useState(lang));
  const { formatMessage } = useIntl();
  const history = useHistory();

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <Typography color="textSecondary" variant="h4">
           <em>
              Biologistka
           </em>
        </Typography>
      </div>
      <div className={classes.toolBarContainer}>
        <Select
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
                {formatMessage({
                  id: `interfaceLang.${langCode}`,
                })}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
};

export default Header;