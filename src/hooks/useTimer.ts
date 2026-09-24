import { useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  initialSeconds: number;
  onTick?: (remaining: number) => void;
  onExpire?: () => void;
  active?: boolean;
}

export function useTimer({ initialSeconds, onTick, onExpire, active = true }: UseTimerOptions) {
  const remainingRef = useRef<number>(initialSeconds);
  const intervalRef = useRef<number | null>(null);
  const expiredRef = useRef(false);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    if (expiredRef.current) return;
    intervalRef.current = window.setInterval(() => {
      remainingRef.current = Math.max(0, remainingRef.current - 1);
      onTick?.(remainingRef.current);
      if (remainingRef.current <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        stop();
        onExpire?.();
      }
    }, 1000);
  }, [stop, onTick, onExpire]);

  const reset = useCallback((newSeconds?: number) => {
    stop();
    expiredRef.current = false;
    remainingRef.current = newSeconds ?? initialSeconds;
  }, [stop, initialSeconds]);

  const getRemaining = useCallback(() => remainingRef.current, []);

  useEffect(() => {
    if (active) {
      start();
    } else {
      stop();
    }
    return stop;
  }, [active, start, stop]);

  return { stop, start, reset, getRemaining };
}
