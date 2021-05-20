import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import TabMUI from '@material-ui/core/Tab';
import Typography from '../Typography';

const getClasses = makeStyles(theme => ({
  root: {
    opacity: 1,
  },
  selected: {
    background: theme.palette.tertiary.main,
  },
}));

const Tab = ({
  children,
  label,
  selected,
  value,
  ...props
}) => {
  const classes = getClasses();
  console.log(selected);
  return (
    <TabMUI
      {...props}
      classes={{
        root: classNames(
          classes.root,
          selected && classes.selected,
        ),
      }}
      label={(
        <Typography>
          {label}
        </Typography>
      )}
      selected={selected}
      value={value}
    />
  )
};


Tab.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default Tab;