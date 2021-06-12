import { makeStyles } from '@material-ui/core/styles';
import ButtonMUI from '@material-ui/core/Button';
import * as COLORS from 'constants/colors';
import PropTypes from 'prop-types';
import React from 'react';
const rootClass = {
  borderRadius: '4px',
  boxShadow: '0px 0px 6px 0px #f6efe6',
  padding: '8px 16px',
};
const getClasses = makeStyles(theme => ({
  root: {
    ...rootClass,
  },
  variant_default: {
    ...rootClass,
    background: COLORS.PRIMARY.contrast,
    '&:hover': {
      backgroundColor: COLORS.BROWN._10,
    },
  },
  variant_main: {
    ...rootClass,
    background: COLORS.PRIMARY.main,
    '&:hover': {
      backgroundColor: COLORS.PRIMARY.main,
    },
  },
}));

const Button = ({
  children = null,
  disabled = false,
  fullWidth = false,
  onClick,
  variant = 'default'
}) => {
  const classes = getClasses();
  return (
    <ButtonMUI
      classes={{
        root: classes[`variant_${variant}`],
      }}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </ButtonMUI>
  );
};

Button.propTypes = {
  children: PropTypes.object,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'main',
  ]),
};

export default Button;