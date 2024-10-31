import { useState, useEffect } from 'react';

export const useDebouncedValue = <T>(input: T, time: number = 300, callback?: () => void) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    console.log('IM IN useDebouncedValue');
    callback && callback();
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debouncedValue;
};
