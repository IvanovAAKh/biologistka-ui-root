import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import SvgIcon from '../SvgIcon';

/* eslint-disable max-len */
const Close = ({
  color = 'icon',
  size = 32,
}) => {
  const theme = useTheme();
  const actualColor = theme.palette[color] ? theme.palette[color].main : color;
  return (
    <SvgIcon
      nativeColor={actualColor}
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      viewBox="0 0 24 24"
    >
      <path
        fill={actualColor}
        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
      />
    </SvgIcon>
  );
};

Close.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Close;