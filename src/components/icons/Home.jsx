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
      viewBox="0 0 24 24"
    >
      <g>
        <path
          fill={actualColor}
          d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
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