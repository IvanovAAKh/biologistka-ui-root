import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const getClasses = makeStyles(theme => ({
  container: {
    background: theme.palette.tertiary.main,
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