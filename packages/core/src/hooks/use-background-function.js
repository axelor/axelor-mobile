import {useCallback, useEffect, useRef} from 'react';

const TIME_BETWEEN_CALL = 300000;

export const useBackgroundFunction = backgroundFunctions => {
  const interval = useRef(null);

  const handleListFunctions = useCallback(() => {
    backgroundFunctions?.forEach(backgroundFunction => {
      backgroundFunction();
    });
  }, [backgroundFunctions]);

  return useEffect(() => {
    if (backgroundFunctions?.length === 0) {
      return;
    }

    interval.current = setInterval(handleListFunctions, TIME_BETWEEN_CALL);
    return () => clearInterval(interval.current);
  }, [backgroundFunctions?.length, handleListFunctions]);
};
