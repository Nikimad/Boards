import { useCallback, useRef } from "react";

const useDebounceCallback = (cb, delay) => {
  const previousCall = useRef();
  const lastCall = useRef();
  const lastCallTimer = useRef();

  return useCallback(
    (...args) => {
      previousCall.current = lastCall.current;
      lastCall.current = Date.now();
      
      if (
        previousCall.current &&
        lastCall.current - previousCall.current <= delay
      ) {
        clearTimeout(lastCallTimer.current);
      }
      lastCallTimer.current = setTimeout(() => cb(...args), delay);
    },
    [cb, delay]
  );
};

export default useDebounceCallback;
