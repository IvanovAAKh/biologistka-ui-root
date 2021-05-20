import {makeStyles} from "@material-ui/core";
import IconButtonMUI from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

const getClasses = makeStyles(() => ({
  root: {
    padding: '8px',
  },
}));

const IconButton = ({
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
    >
      { children }
    </IconButtonMUI>
  );
};

IconButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;