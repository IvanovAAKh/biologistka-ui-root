import { makeStyles } from '@material-ui/core/styles';
import DialogContentMUI from '@material-ui/core/DialogContent';
import classNames from 'classnames';
import IconButton from '../IconButton';
import IconClose from '../icons/Close';
import PropTypes from 'prop-types';
import React from 'react';

const getClasses = makeStyles(() => ({
  root: {
    padding: '0px',
  },
}));

const DialogContent = ({
  children = null,
}) => {
  const classes = getClasses();
  return (
    <DialogContentMUI
      classes={{
        root: classes.root,
      }}
    >
      {children}
    </DialogContentMUI>
  );
};

DialogContent.propTypes = {
  children: PropTypes.object,
};

export default DialogContent;