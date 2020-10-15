import * as COLORS from 'constants/colors';

export default {
  overrides: {
    MuiMenu: {
      paper: {
        background: COLORS.GOLDEN._10,
      }
    },
  },
  palette: {
    primary: {
      main: COLORS.BROWN._100,
    },
    secondary: {
      main: COLORS.GOLDEN._100,
    },
    text: {
      primary: COLORS.BROWN._100,
      secondary: COLORS.BROWN._50,
    },
  },
};