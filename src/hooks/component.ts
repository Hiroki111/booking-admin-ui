import { useState, useEffect } from 'react';

export function useComponentDimensions(refObject: React.MutableRefObject<any>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  function updateDimentions() {
    setDimensions({
      width: refObject.current.offsetWidth || 0,
      height: refObject.current.offsetHeight || 0,
    });
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimentions);
    if (refObject.current) {
      updateDimentions();
    }

    return () => window.removeEventListener('resize', updateDimentions);
  }, [refObject?.current]);

  return dimensions;
}
