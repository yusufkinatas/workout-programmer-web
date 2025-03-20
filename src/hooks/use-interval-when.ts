import { useEffect, useRef } from "react";

interface UseIntervalWhenOptions {
  ms: number;
  when: boolean;
}

export function useIntervalWhen(
  callback: () => void,
  { ms, when }: UseIntervalWhenOptions
) {
  const intervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (when) {
      intervalRef.current = setInterval(callback, ms);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [callback, ms, when]);
}
