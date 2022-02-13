import { useState, useLayoutEffect } from 'react';

import { themeConfig } from '../theme/RootThemeProvider';

function useInnerWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  function updateSize() {
    setSize([window.innerWidth, window.innerHeight]);
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export function useIsSmallWindow() {
  const size = useInnerWindowSize();
  return size[0] < themeConfig.breakpoints.values.md;
}
