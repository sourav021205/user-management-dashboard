import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    function () {
      const timer = setTimeout(function () {
        setDebouncedValue(value);
      }, delay);

      return function () {
        clearTimeout(timer);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}

export default useDebounce;
