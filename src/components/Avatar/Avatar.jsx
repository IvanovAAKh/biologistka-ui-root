import { makeStyles } from '@material-ui/core';
import AvatarMUI from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import React from 'react';

const getClasses = makeStyles(() => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Avatar = ({
  alt = '',
  size = 24,
  src = '',
}) => {
  const classes = getClasses();
  return (
    <AvatarMUI
      alt={alt}
      className={classes.root}
      src={src}
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  );
};

Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  size: PropTypes.number,
  src: PropTypes.string.isRequired,
};

export default Avatar;