import useScreenSize from 'hooks/useScreenSize';
import * as screenSizeTypes from 'constants/screenSizeTypes';

const MOBILE_SCREENS = [
  screenSizeTypes.EXTRA_SMALL,
  screenSizeTypes.SMALL,
];

const useIsMobile = () => {
  const screenSize = useScreenSize();
  return MOBILE_SCREENS.includes(screenSize);
};

export default useIsMobile;