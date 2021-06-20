import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import SvgIcon from '../SvgIcon';

/* eslint-disable max-len */
const Menu = ({
  color = 'icon',
  size = 24,
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
      <g>
        <path
          d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
          fill={actualColor}
        />
      </g>
    </SvgIcon>
  );
};

Menu.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Menu;