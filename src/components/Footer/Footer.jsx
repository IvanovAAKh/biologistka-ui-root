import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from 'components/Typography';

import useIsMobile from 'hooks/useIsMobile/index';
import * as COLORS from 'constants/colors';

const getClasses = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '24px',
    width: '100%',
  },
  contentContainer: {
    // background: COLORS.GRAY,
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    padding: `${theme.spacing(1)}px`,
  }
}));

const Footer = ({
  children,
}) => {
  const classes = getClasses();
  return (
    <div className={classes.container}>
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          {(children || []).length
            ? children
            : (
              <Typography
                color="tertiary"
                variant="caption"
              >
                Created by IvanovAAKh@gmail.com - 23.04.2020
              </Typography>
            )
          }
        </div>
      </div>
    </div>
  )
};

export default Footer;