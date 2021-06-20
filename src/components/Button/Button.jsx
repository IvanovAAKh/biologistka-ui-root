import { makeStyles } from '@material-ui/core/styles';
import ButtonMUI from '@material-ui/core/Button';
import classNames from 'classnames';
import * as COLORS from 'constants/colors';
import PropTypes from 'prop-types';
import React from 'react';
const rootClass = {
  borderRadius: '4px',
  // boxShadow: '0px 0px 6px 0px #f6efe6',
  // padding: '8px 16px',
};
const getClasses = makeStyles(theme => ({
  background_default: {
    background: COLORS.DEFAULT_BUTTON.background,
  },
  backgroundDisabled_default: {
    background: COLORS.DEFAULT_BUTTON.disabled,
  },
  backgroundDisabled_main: {
    background: COLORS.MAIN_BUTTON.disabled,
  },
  background_main: {
    background: COLORS.MAIN_BUTTON.background,
  },
  label_default: {
    color: COLORS.DEFAULT_BUTTON.text,
  },
  label_main: {
    color: COLORS.MAIN_BUTTON.text,
  },
  root: {
    ...rootClass,
  },
  size_small: {
    padding: '4px 5px',
  },
  size_medium: {
    padding: '6px 8px',
  },
  size_big: {
    padding: '8px 16px',
  },
  variant_default: {
    ...rootClass,
    '&:hover': {
      backgroundColor: COLORS.BROWN._10,
    },
  },
  variant_main: {
    ...rootClass,
    '&:hover': {
      backgroundColor: COLORS.MAIN_BUTTON.hovered,
    },
  },
}));

const Button = ({
  children = null,
  disabled = false,
  fullWidth = false,
  onClick,
  size = 'small',
  variant = 'default'
}) => {
  const classes = getClasses();
  return (
    <ButtonMUI
      classes={{
        label: classes[`label_${variant}`],
        root: classNames(
          classes[`variant_${variant}`],
          disabled
            ? classes[`backgroundDisabled_${variant}`]
            : classes[`background_${variant}`],
          classes[`size_${size}`],
        ),
      }}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      size={size}
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
  size: PropTypes.oneOf([
    'small',
    'medium',
    'big'
  ]),
  variant: PropTypes.oneOf([
    'default',
    'main',
  ]),
};

export default Button;