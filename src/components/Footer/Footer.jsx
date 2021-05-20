import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from 'components/Typography';

import useScreenSize from 'hooks/useScreenSize';
import * as screenSizes from 'constants/screenSizes';
import * as COLORS from 'constants/colors';

const getClasses = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    background: COLORS.GRAY,
    display: 'flex',
    flexDirection: 'column',
    height: '24px',
  },
  contentContainer: {
    background: COLORS.GRAY,
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    width: '1024px',
  },
  smallScreenContentContainer: {
    background: COLORS.GRAY,
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
  const screenSize = useScreenSize();
  return (
    <div className={classes.container}>
      {screenSize === screenSizes.LARGE && (
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
      )}
      {[
        screenSizes.SMALL,
        screenSizes.MEDIUM,
      ].includes(screenSize) && (
        <div className={classes.smallScreenContentContainer}>
          <div className={classes.content}>
            {(children || []).length
              ? children
              : (
                <Typography
                  color="textSecondary"
                  variant="caption"
                >
                  <span style={{color: '#D9D0C0'}}>
                    Created by IvanovAAKh@gmail.com - 23.04.2020
                  </span>
                </Typography>
              )
            }
          </div>
        </div>
      )}
    </div>
  )
};

export default Footer;