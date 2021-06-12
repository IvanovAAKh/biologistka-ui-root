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
    icon: {
      main: COLORS.BROWN._30,
    },
    primary: {
      main: COLORS.PRIMARY.main,
    },
    secondary: {
      main: COLORS.SECONDARY.main,
    },
    tertiary: {
      main: COLORS.TERTIARY.main,
    },
    text: {
      primary: COLORS.BROWN._100,
      secondary: COLORS.BROWN._30,
      tertiary: COLORS.GOLDEN._100,
    },
  },
  typography: {
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      textTransform: 'capitalize',
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: '0.03333em',
      lineHeight: 1.66,
    },
    fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  }
};