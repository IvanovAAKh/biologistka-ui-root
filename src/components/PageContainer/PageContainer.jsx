import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import withScreenSize from 'HOCs/withScreenSize';
import * as COLORS from 'constants/colors';
import * as SCREEN_SIZES from 'constants/screenSizes';

const getClasses = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    background: COLORS.GRAY,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: `${theme.spacing(1)}px`,
    paddingTop: `${theme.spacing(2)}px`
  },
  contentContainer: {
    background: COLORS.WHITE,
    borderColor: COLORS.GOLDEN._50,
    borderStyle: 'solid',
    borderWidth: '0px 1px 1px 1px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1024px',
  },
  fullWidthContentContainer: {
    background: COLORS.WHITE,
    borderColor: COLORS.GOLDEN._50,
    borderStyle: 'solid',
    borderWidth: '0px 1px 1px 1px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
}));

const PagesContainer = ({
  children,
  fullWidth,
  screenSize,
}) => {
  const classes = getClasses();
  return (
    <div className={classes.container}>
      {screenSize === SCREEN_SIZES.LARGE && (
        <div className={fullWidth ? classes.fullWidthContentContainer : classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      )}
      {[
        SCREEN_SIZES.SMALL,
        SCREEN_SIZES.MEDIUM
      ].includes(screenSize) && (
        <div className={classes.fullWidthContentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
};

export default withScreenSize(PagesContainer);