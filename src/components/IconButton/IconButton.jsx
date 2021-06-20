import { makeStyles } from '@material-ui/core';
import * as colors from 'constants/colors';
import IconButtonMUI from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

const getClasses = makeStyles(() => ({
  root: {
    padding: '8px',
  },
}));

const IconButton = ({
  borderColor = colors.BROWN._30,
  children = null,
  onClick,
}) => {
  const classes = getClasses();
  return (
    <IconButtonMUI
      classes={{
        root: classes.root,
      }}
      onClick={onClick}
      style={{
        boxShadow: `0px 0px 6px 0px ${borderColor}`,
      }}
    >
      { children }
    </IconButtonMUI>
  );
};

IconButton.propTypes = {
  borderColor: PropTypes.string,
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;