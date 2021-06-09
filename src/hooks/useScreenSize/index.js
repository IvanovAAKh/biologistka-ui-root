import { useEffect, useState } from 'react';
import {
  SCREEN as SCREEN_SIZES,
} from 'constants/sizes';

// 1 -> 99 (ascending) sorting
const sortedScreenSizes = Object
  .entries(SCREEN_SIZES)
  .sort(([, value1], [, value2]) => value1 - value2);

const getScreenSize = () => {
  const screenWidth = window.innerWidth;
  const [screenSizeType] = sortedScreenSizes.find(([, value]) => value >= screenWidth);

  return screenSizeType;
};

const useScreenSize = () => {
  const [currentScreenSize, setCurrentScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const onWindowResize = () => {
      setCurrentScreenSize(getScreenSize());
    };
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return currentScreenSize;
};

export default useScreenSize;