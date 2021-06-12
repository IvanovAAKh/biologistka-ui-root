import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import * as COLORS from 'constants/colors';

const getClasses = makeStyles(() => ({
  container: {
    // background: COLORS.TERTIARY.contrast,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const TabContent = ({
  children,
}) => {
  const classes = getClasses();

  return (
    <div className={classes.container}>
      {children}
    </div>
  )
};


TabContent.propTypes = {
  value: PropTypes.string.isRequired,
};

export default TabContent;