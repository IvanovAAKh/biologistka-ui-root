import React from 'react';
import { useIntl } from "react-intl";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import IconInstagram from '@material-ui/icons/Instagram';
import IconMenuBook from '@material-ui/icons/MenuBook';
import IconTelegram from '@material-ui/icons/Telegram';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import Typography from 'components/Typography';
import * as COLORS from 'constants/colors';
import * as SECTIONS from 'constants/sections';

const getClasses = makeStyles(theme => ({
  icon: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '24px',
    width: '24px',
  },
  iconInstagram: {
    color: COLORS.INSTAGRAM,
  },
  iconTelegram: {
    color: COLORS.TELEGRAM,
  },
  iconWorkbooks: {
    transform: 'rotate(15deg)',
  },
  leftNavPanelBackgroundImage: {
    background: 'url(headerLeftNavPanel.png)',
    backgroundSize: 'contain',
    backgroundPositionY: 'bottom',
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%'
  },
  leftNavPanel: {
    background: COLORS.PRIMARY.contrast,
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

}) => {
  const classes = getClasses();
  const { formatMessage } = useIntl();

  return (
    <div className={classes.leftNavPanel}>
      <List>
        <ListItem button>
          <Avatar
            alt="Nataliia Kovalchuk"
            className={classes.icon}
            src="/me.jpg"
          />
          <div className={classes.paddingLeft2x}>
            <Typography>
              {formatMessage({
                id: `section.${SECTIONS.ABOUT_ME}`
              })}
            </Typography>
          </div>
        </ListItem>
        <ListItem button>
          <div
            className={classNames(
              classes.iconWorkbooks,
              classes.icon,
            )}
          >
            <IconMenuBook />
          </div>
          <div className={classes.paddingLeft2x}>
            <Typography>
              {formatMessage({
                id: `section.${SECTIONS.WORKBOOKS}`
              })}
            </Typography>
          </div>
        </ListItem>
      </List>
      <div className={classes.leftNavPanelBottom}>
        <div className={classes.leftNavPanelBackgroundImage} />
        <List>
          <div className={classes.paddingLeft2x}>
            <Typography>
              {`${formatMessage({
                id: `section.${SECTIONS.CONTACTS}`
              })}:`}
            </Typography>
          </div>
          <ListItem>
            <div className={classes.icon}>
              <IconTelegram className={classes.iconTelegram} />
            </div>
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
            <div className={classes.icon}>
              <IconInstagram className={classes.iconInstagram} />
            </div>
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

export default LeftNavPanel;