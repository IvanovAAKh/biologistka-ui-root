import React from 'react';
import PropTypes from 'prop-types';
import TypographyMUI from '@material-ui/core/Typography';

const Typography = ({
  children,
  color = 'textPrimary',
  variant = 'body1',
}) => (
  <TypographyMUI
    color={color}
    variant={variant}
  >
    { children }
  </TypographyMUI>
);

Typography.propTypes = {
  color: PropTypes.oneOf([
    'textPrimary',
    'textSecondary'
  ]),
  variant: PropTypes.oneOf([
    'body1',
    'button',
    'caption',
    'h1',
  ])
};

export default Typography;