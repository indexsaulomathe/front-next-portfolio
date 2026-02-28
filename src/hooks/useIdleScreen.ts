import { useState, useEffect, useRef } from "react";

export function useIdleScreen(idleTimeMs: number = 60000) {
  const [isIdle, setIsIdle] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (mountedRef.current) setIsIdle(false);

      timeoutId = setTimeout(() => {
        if (mountedRef.current) setIsIdle(true);
      }, idleTimeMs);
    };

    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"] as const;

    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutId);
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [idleTimeMs]);

  return isIdle;
}
