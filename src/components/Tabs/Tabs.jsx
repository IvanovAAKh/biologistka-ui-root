import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import TabsMUI from '@material-ui/core/Tabs';

const getClasses = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
}));

const Tabs = ({
  children,
  fullWidth = false,
  onChange,
  value,
}) => {
  const classes = getClasses();

  return (
    <TabsMUI
      classes={{
        root: fullWidth && classes.fullWidth,
      }}
      variant={fullWidth && 'fullWidth'}
      onChange={onChange}
      value={value}
    >
      {children}
    </TabsMUI>
  )
};


Tabs.propTypes = {
  children: PropTypes.array.isRequired,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Tabs;