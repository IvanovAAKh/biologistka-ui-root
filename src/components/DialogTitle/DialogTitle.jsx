import { makeStyles } from '@material-ui/core/styles';
import DialogTitleMUI from '@material-ui/core/DialogTitle';
import classNames from 'classnames';
import IconButton from '../IconButton';
import IconClose from '../icons/Close';
import PropTypes from 'prop-types';
import React from 'react';

const getClasses = makeStyles(() => ({
  buttonContainer: {
    margin: '-8px',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  root: {
    padding: '16px',
  },
}));

const DialogTitle = ({
  children,
  onClose,
}) => {
  const classes = getClasses();
  return (
    <DialogTitleMUI
      classes={{
        root: classes.root,
      }}
      disableTypography
      onClose={onClose}
      open
    >
      <div
        className={classNames(
          classes.content,
          !children && classes.justifyEnd,
        )}
      >
        { children }
        { onClose && (
          <div className={classes.buttonContainer}>
            <IconButton onClick={onClose}>
              <IconClose size={24} />
            </IconButton>
          </div>
        )}
      </div>
    </DialogTitleMUI>
  );
};

DialogTitle.propTypes = {
  onClose: PropTypes.func.isRequired,
  width: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
};

export default DialogTitle;