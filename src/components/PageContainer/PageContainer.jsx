import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useScreenSize from 'hooks/useScreenSize';
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
}) => {
  const classes = getClasses();
  const screenSize = useScreenSize();
  let contentContainerClass = classes.contentContainer;
  if (fullWidth || [
    SCREEN_SIZES.SMALL,
    SCREEN_SIZES.MEDIUM
  ].includes(screenSize)) {
    contentContainerClass = classes.fullWidthContentContainer;
  }
  return (
    <div className={classes.container}>
      <div className={contentContainerClass}>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  )
};

export default PagesContainer;