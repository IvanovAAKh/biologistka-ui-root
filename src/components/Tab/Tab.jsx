import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import TabMUI from '@material-ui/core/Tab';
import Typography from '../Typography';
import * as COLORS from 'constants/colors';
const getClasses = makeStyles(() => ({
  root: {
    opacity: 1,
  },
  selected: {
    background: COLORS.PRIMARY.contrast,
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
  selected: PropTypes.bool,
  value: PropTypes.string,
};

export default Tab;