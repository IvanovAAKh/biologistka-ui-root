import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import withAvailablePages from 'HOCs/withAvailablePages';
import withScreenSize from 'HOCs/withScreenSize';
import * as SCREEN_SIZES from 'constants/screenSizes';
import * as COLORS from 'constants/colors';
import * as PAGES from 'constants/pages';
import Typography from "@material-ui/core/Typography/Typography";

const getClasses = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    background: COLORS.GRAY,
    display: 'flex',
    flexDirection: 'column',
    height: '48px',
  },
  contentContainer: {
    background: COLORS.WHITE,
    borderColor: COLORS.GOLDEN._50,
    borderStyle: 'solid',
    borderWidth: '1px 1px 0px 1px',
    boxSizing: 'border-box',
    display: 'flex',
    height: '100%',
    width: '1024px',
  },
  smallScreenContentContainer: {
    background: COLORS.WHITE,
    borderColor: COLORS.GOLDEN._50,
    borderStyle: 'solid',
    borderWidth: '1px 1px 0px 1px',
    boxSizing: 'border-box',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: `${theme.spacing(1)}px`,
    paddingRight: `${theme.spacing(1)}px`,
    width: '100%',
  }
}));

const PageHeader = ({
  availablePages,
  screenSize,
}) => {
  const classes = getClasses();
  const { formatMessage } = useIntl();
  const history = useHistory();
  const {
    pathname,
    search,
  } = useLocation();

  return (
    <div className={classes.container}>
      {screenSize === SCREEN_SIZES.LARGE && (
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Tabs
              onChange={(event, selectedTabIndex) => {
                history.push({
                  pathname: availablePages[selectedTabIndex],
                  search,
                });
              }}
              value={availablePages.findIndex(page => page === pathname)}
            >
              {availablePages.map(page => (
                <Tab
                  label={(
                    <Typography color="textPrimary">
                      <strong>
                        {formatMessage({
                          id: `page.${Object
                            .keys(PAGES)
                            .find(pageKey => PAGES[pageKey] === page)}`},
                        )}
                      </strong>
                    </Typography>
                  )}
                  key={page}
                />
              ))}
            </Tabs>
          </div>
        </div>
      )}
      {[
        SCREEN_SIZES.SMALL,
        SCREEN_SIZES.MEDIUM,
      ].includes(screenSize) && (
        <div className={classes.smallScreenContentContainer}>
          <div className={classes.content}>
            <Tabs
              onChange={(event, selectedTabIndex) => {
                history.push({
                  pathname: availablePages[selectedTabIndex],
                  search,
                });
              }}
              value={availablePages.findIndex(page => page === pathname)}
              variant="fullWidth"
            >
              {availablePages.map(page => (
                <Tab
                  label={(
                    <Typography color="textPrimary">
                      <strong>
                        {formatMessage({
                          id: `page.${Object
                            .keys(PAGES)
                            .find(pageKey => PAGES[pageKey] === page)}`},
                        )}
                      </strong>
                    </Typography>
                  )}
                  key={page}
                />
              ))}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
};

export default withAvailablePages(withScreenSize(PageHeader));