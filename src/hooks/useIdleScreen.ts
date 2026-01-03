import { useState, useEffect } from "react";

export function useIdleScreen(idleTimeMs: number = 60000) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      setIsIdle(false);

      timeoutId = setTimeout(() => {
        setIsIdle(true);
      }, idleTimeMs);
    };

    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];

    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [idleTimeMs]);

  return isIdle;
}
