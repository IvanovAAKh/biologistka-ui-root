import { useTheme } from '@material-ui/core/styles';
import * as colors from 'constants/colors';
import PropTypes from 'prop-types';
import React from 'react';
import SvgIcon from '../SvgIcon';

/* eslint-disable max-len */
const Telegram = ({
  color = colors.TELEGRAM,
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
          d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"
          fill={actualColor}
        />
      </g>
    </SvgIcon>
  );
};

Telegram.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Telegram;