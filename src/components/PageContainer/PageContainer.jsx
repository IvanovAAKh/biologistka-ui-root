import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Footer from 'components/Footer';
import LeftNavPanel from 'components/LeftNavPanel';
import useIsMobile from 'hooks/useIsMobile';
import useScreenSize from 'hooks/useScreenSize';
import * as COLORS from 'constants/colors';
import * as screenSizeTypes from 'constants/screenSizeTypes';
import {
  CONTENT_PANEL_WIDTH,
  HEADER_HEIGHT,
  LEFT_NAV_PANEL_WIDTH,
} from 'constants/sizes';

const getClasses = makeStyles((theme) => ({
  container: {
    justifyContent: 'center',
    background: COLORS.PRIMARY.contrast,
    display: 'flex',
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
    minWidth: `${CONTENT_PANEL_WIDTH}px`,
    width: `${CONTENT_PANEL_WIDTH}px`,
  },
  leftNavPanel: {
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    position: 'fixed',
  },
  leftNavPanelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px 8px',
    width: `${LEFT_NAV_PANEL_WIDTH - 16}px`,
  },
  footerContainer: {
    alignItems: 'flex-end',
    display: 'flex',
    height: '100%',
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
  const isMobile = useIsMobile();
  const screenSize = useScreenSize();

  return (
    <div className={classes.container}>
      {![
        screenSizeTypes.EXTRA_SMALL,
        screenSizeTypes.SMALL,
        screenSizeTypes.MEDIUM,
      ].includes(screenSize) && (
        <div className={classes.leftNavPanelContainer}>
          <div className={classes.leftNavPanel}>
            <LeftNavPanel />
          </div>
        </div>
      )}
      <div
        className={(fullWidth || isMobile)
          ? classes.fullWidthContentContainer
          : classes.contentContainer}
      >
        {children}
        <div className={classes.footerContainer}>
          <Footer />
        </div>
      </div>
    </div>
  )
};

export default PagesContainer;