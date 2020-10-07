import React, { useEffect, useState } from 'react';
import * as SCREEN_SIZES from 'constants/screenSizes';

const getScreenSize = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth > 0 && screenWidth <= 320) {
    return SCREEN_SIZES.SMALL;
  }
  if (screenWidth > 320 && screenWidth < 1024) {
    return SCREEN_SIZES.MEDIUM;
  }
  return SCREEN_SIZES.LARGE
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