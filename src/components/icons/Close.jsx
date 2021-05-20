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
  console.log(theme);
  return (
    <SvgIcon
      nativeColor={actualColor}
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      viewBox="0 0 32 32"
    >
      <g transform="translate(-709.000000, -65.000000)">
        <g transform="translate(709.000000, 65.000000)">
          <path
            fill={actualColor}
            d="M23,10.41 L21.59,9 L16,14.59 L10.41,9 L9,10.41 L14.59,16 L9,21.59 L10.41,23 L16,17.41 L21.59,23 L23,21.59 L17.41,16 L23,10.41 L23,10.41 Z"
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