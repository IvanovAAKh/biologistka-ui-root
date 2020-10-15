import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import * as COLORS from 'constants/colors';

const getClasses = makeStyles(theme => ({
  icon: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '24px',
    width: '24px',
  },
  container: {
    minWidth: 'fit-content',
    position: 'relative',
  },
  badgeLeft: {
    top: '-10px',
    left: '-9px',
    width: '32px',
    height: '32px',
    transform: 'scaleX(-1) rotate(-25deg)',
    // backgroundImage: 'url(korovka5.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
  },
  badgeMiddle1: {
    top: '10px',
    left: '28px',
    width: '24px',
    height: '24px',
    // backgroundImage: 'url(romashka.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
  },
  badgeMiddle2: {
    top: '6px',
    left: '52px',
    width: '32px',
    height: '32px',
    // backgroundImage: 'url(romashka2.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
  },
  badgeRight: {
    top: '1px',
    left: '139px',
    transform: 'rotate(84deg)',
    width: '32px',
    height: '32px',
    // backgroundImage: 'url(korovka6.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
  },
  badgeRight2: {
    top: '5px',
    left: '162px',
    transform: 'rotate(-25deg)',
    width: '32px',
    height: '32px',
    backgroundImage: 'url(korovka4.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
  },
}));

const Logo = () => {
  const classes = getClasses();
  return (
    <div className={classes.container}>
      <div className={classes.badgeLeft} />
      <div className={classes.badgeMiddle1} />
      <div className={classes.badgeMiddle2} />
      <div className={classes.badgeRight} />
      <Typography color="textSecondary" variant="caption" wrap="nowrap">
        ДО ЗНО: 180 дней, 12 часов
      </Typography>
    </div>
  )
};

export default Logo;