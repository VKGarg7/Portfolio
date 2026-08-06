import { useEffect, useRef } from "react";

export interface MouseParallax {
  /** -1..1, smoothed */
  x: number;
  y: number;
}

/**
 * Tracks normalized mouse position and exposes a ref that's updated every
 * frame (not via React state) so consumers in the R3F render loop can read
 * it directly in useFrame without triggering re-renders.
 */
export function useMouseParallax() {
  const target = useRef<MouseParallax>({ x: 0, y: 0 });
  const smooth = useRef<MouseParallax>({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return { target, smooth };
}
