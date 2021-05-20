import {makeStyles, useTheme} from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import TypographyMUI from '@material-ui/core/Typography';

const getClasses = makeStyles(theme => ({
  primary: {
    color: theme.palette.text.primary,
  },
  secondary: {
    color: theme.palette.text.secondary,
  },
  tertiary: {
    color: theme.palette.text.tertiary,
  },
}));

const Typography = ({
  children,
  color = 'primary',
  variant = 'body1',
}) => {
  const classes = getClasses();
  return (
    <TypographyMUI
      classes={{
        root: classes[color],
      }}
      variant={variant}
    >
      { children }
    </TypographyMUI>
  );
};

Typography.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
  ]),
  variant: PropTypes.oneOf([
    'body1',
    'button',
    'caption',
    'h1',
  ])
};

export default Typography;