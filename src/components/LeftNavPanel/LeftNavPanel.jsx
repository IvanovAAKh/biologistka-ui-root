import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from "react-intl";
import { makeStyles } from '@material-ui/core/styles';

import Avatar from 'components/Avatar';
import IconInstagram from 'components/icons/Instagram';
import IconTelegram from 'components/icons/Telegram';
import IconWorkbook from 'components/icons/Workbook';
import Link from 'components/Link';
import List from 'components/List';
import ListItem from 'components/ListItem';
import Typography from 'components/Typography';
import useCurrentPage from 'hooks/userCurrentPage';
import * as COLORS from 'constants/colors';
import * as pages from 'constants/pages';

const getClasses = makeStyles(theme => ({
  iconWorkbooks: {
    transform: 'rotate(15deg)',
  },
  leftNavPanelBackgroundImage: {
    background: 'url(headerLeftNavPanel.png)',
    backgroundSize: 'contain',
    backgroundPositionY: 'bottom',
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
  },
  leftNavPanel: {
    background: COLORS.LEFT_NAV_PANEL.background,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  leftNavPanelBottom: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  },
  paddingLeft2x: {
    paddingLeft: `${theme.spacing(2)}px`,
  },
}));

const LeftNavPanel = ({
  onChange,
}) => {
  const classes = getClasses();
  const { formatMessage } = useIntl();
  const currentPage = useCurrentPage();

  return (
    <div className={classes.leftNavPanel}>
      <List onClick={onChange}>
        <Link
          to={location => ({
            ...location,
            pathname: `/${pages.MAIN}`
          })}
        >
          <ListItem
            selected={currentPage === pages.MAIN}
            variant="button"
          >
            <Typography>
              Main
            </Typography>
          </ListItem>
        </Link>
        <Link
          to={location => ({
            ...location,
            pathname: `/${pages.ABOUT_ME}`
          })}
        >
          <ListItem
            selected={currentPage === pages.ABOUT_ME}
            variant="button"
          >
            <Avatar
              alt="Nataliia Kovalchuk"
              size={24}
              src="/me.jpg"
            />
            <div className={classes.paddingLeft2x}>
              <Typography>
                {formatMessage({
                  id: `page.${pages.ABOUT_ME}`
                })}
              </Typography>
            </div>
          </ListItem>
        </Link>
        <Link
          to={location => ({
            ...location,
            pathname: `/${pages.WORKBOOKS}`
          })}
        >
          <ListItem
            selected={currentPage === pages.WORKBOOKS}
            variant="button"
          >
            <div className={classes.iconWorkbooks}>
              <IconWorkbook />
            </div>
            <div className={classes.paddingLeft2x}>
              <Typography>
                {formatMessage({
                  id: `page.${pages.WORKBOOKS}`
                })}
              </Typography>
            </div>
          </ListItem>
        </Link>
      </List>
      <div className={classes.leftNavPanelBottom}>
        <div className={classes.leftNavPanelBackgroundImage} />
        <List>
          <div className={classes.paddingLeft2x}>
            <Typography>
              {`${formatMessage({
                id: 'contacts',
              })}:`}
            </Typography>
          </div>
          <ListItem>
            <IconTelegram />
            <div className={classes.paddingLeft2x}>
              <Link href="https://telegram.me/supernatant">
                <Typography>
                  <u>
                    @supernatant
                  </u>
                </Typography>
              </Link>
            </div>
          </ListItem>
          <ListItem>
            <IconInstagram />
            <div className={classes.paddingLeft2x}>
              <Link href="https://www.instagram.com/biologistka/">
                <Typography>
                  <u>
                    @biologistka
                  </u>
                </Typography>
              </Link>
            </div>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

LeftNavPanel.propTypes = {
  onChange: PropTypes.func,
};

export default LeftNavPanel;