import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import SvgIcon from '../SvgIcon';

const Home = ({
  color = 'icon',
  size = 24,
}) => {
  const theme = useTheme();
  const actualColor = theme.palette[color] ? theme.palette[color].main : color;
  return (
    <SvgIcon
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      viewBox="0 0 405 405"
    >
      <g>
        <path
          fill={actualColor}
          d="M208 2l194 161c6,5 2,15 -6,15l-45 0 0 195c0,5 -4,9 -9,9l-94 0c-5,0 -9,-4 -9,-9l0 -113c0,-5 -3,-9 -8,-9l-57 0c-5,0 -9,4 -9,9l0 113c0,5 -3,9 -8,9l-94 0c-5,0 -9,-4 -9,-9l0 -195 -46 0c-7,0 -11,-10 -5,-15l194 -161c3,-3 8,-3 11,0z"
        />
      </g>
    </SvgIcon>
  );
};

Home.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Home;