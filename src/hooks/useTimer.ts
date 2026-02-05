import { useState, useCallback, useRef, useEffect } from 'react';

interface UseTimerOptions {
  onTick?: (remaining: number) => void;
  onHalf?: () => void;
  onUrgent?: () => void;
  onComplete?: () => void;
}

export function useTimer(options: UseTimerOptions = {}) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const halfFiredRef = useRef(false);
  const urgentFiredRef = useRef(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const start = useCallback((duration: number) => {
    stop();
    setTotalTime(duration);
    setTimeRemaining(duration);
    halfFiredRef.current = false;
    urgentFiredRef.current = false;
    setIsRunning(true);
  }, [stop]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setTimeRemaining(prev => {
        const next = prev - 1;

        if (optionsRef.current.onTick) {
          optionsRef.current.onTick(next);
        }

        if (!halfFiredRef.current && totalTime > 0 && next <= totalTime / 2) {
          halfFiredRef.current = true;
          optionsRef.current.onHalf?.();
        }

        if (!urgentFiredRef.current && next <= 10 && next > 0) {
          urgentFiredRef.current = true;
          optionsRef.current.onUrgent?.();
        }

        if (next <= 0) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          optionsRef.current.onComplete?.();
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, totalTime]);

  const pause = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (timeRemaining > 0) {
      setIsRunning(true);
    }
  }, [timeRemaining]);

  const reset = useCallback(() => {
    stop();
    setTimeRemaining(0);
    setTotalTime(0);
  }, [stop]);

  const progress = totalTime > 0 ? timeRemaining / totalTime : 0;

  return {
    timeRemaining,
    totalTime,
    isRunning,
    progress,
    start,
    pause,
    resume,
    stop,
    reset,
  };
}
