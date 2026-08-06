import { useEffect } from "react";

let lockCount = 0;
let previousOverflow = "";

/**
 * Locks document scrolling while active. Multiple consumers may lock at once;
 * scrolling is restored only after the last one releases its lock.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
