import DialogMUI from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';

const widthMapping = {
  extraSmall: 'xs',
  medium: 'md',
  small: 'sm',
  large: 'lg',
};

const Dialog = ({
  children,
  onClose,
  width = 'medium'
}) => (
  <DialogMUI
    fullWidth
    maxWidth={widthMapping[width]}
    onClose={onClose}
    open
   >
    { children }
  </DialogMUI>
);

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  width: PropTypes.oneOf([
    'extraSmall',
    'small',
    'medium',
    'large',
  ]),
};

export default Dialog;