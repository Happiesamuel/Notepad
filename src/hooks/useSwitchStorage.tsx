import { useEffect, useState } from "react";
export function useSwitchStorage<T>(
  initialValue: T,
  key: string
): [T, (value: T) => void] {
  const [isDarkmode, setIsdarkmode] = useState<T>(function () {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : initialValue;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(isDarkmode));
    },
    [isDarkmode, key]
  );
  return [isDarkmode, setIsdarkmode];
}
