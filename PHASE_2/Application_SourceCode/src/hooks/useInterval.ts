/* eslint-disable consistent-return */
import { useEffect, useRef } from "react";

// Runs callback function with a specified delay
export const useInterval = (callback: () => void, delay: number): void => {
  const savedCallback: any = useRef();
  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Setup the interval
  useEffect(() => {
    const tick = (): void => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
};
