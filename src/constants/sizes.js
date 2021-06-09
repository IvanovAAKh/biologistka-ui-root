import * as screenSizeTypes from './screenSizeTypes';

export const SCREEN = {
  [screenSizeTypes.EXTRA_SMALL]: 320,
  [screenSizeTypes.SMALL]: 768,
  [screenSizeTypes.MEDIUM]: 968,
  [screenSizeTypes.LARGE]: Number.MAX_VALUE // all other sizes
};

export const CONTENT_PANEL_WIDTH = SCREEN[screenSizeTypes.SMALL];
export const LEFT_NAV_PANEL_WIDTH = SCREEN[screenSizeTypes.MEDIUM] - SCREEN[screenSizeTypes.SMALL];
export const HEADER_HEIGHT = 48;