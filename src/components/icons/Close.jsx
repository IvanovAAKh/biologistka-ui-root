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
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      viewBox="0 0 24 24"
    >
      <g transform="translate(-709.000000, -65.000000)">
        <g transform="translate(709.000000, 65.000000)">
          <path
            fill={actualColor}
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

Close.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Close;