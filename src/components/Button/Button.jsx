import { makeStyles } from '@material-ui/core/styles';
import ButtonMUI from '@material-ui/core/Button';
import * as COLORS from 'constants/colors';
import PropTypes from 'prop-types';
import React from 'react';

const getClasses = makeStyles(theme => ({
  root: {
    // borderBottom: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
  },
}));

const Button = ({
  children = null,
  onClick,
}) => {
  const classes = getClasses();
  return (
    <ButtonMUI
      classes={{
        root: classes.root,
      }}
      onClick={onClick}
    >
      {children}
    </ButtonMUI>
  );
};

Button.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default Button;