import { useEffect, useRef, useState } from "react";

/**
 * Shared count-up animation hook using a cubic ease-out curve.
 * Returns the current display value and a ref to attach to the element
 * that should trigger the animation when it scrolls into view.
 */
export function useCountUp(
  value: number,
  duration = 1400,
  options?: { triggerOnView?: boolean; threshold?: number; decimals?: number }
) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);
  const decimals = options?.decimals ?? 0;

  useEffect(() => {
    const run = () => {
      if (started.current) return;
      started.current = true;
      let frame = 0;
      const start = performance.now();
      const tick = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const raw = value * (1 - Math.pow(1 - progress, 3));
        setDisplay(decimals > 0 ? Number(raw.toFixed(decimals)) : Math.round(raw));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    };

    if (!options?.triggerOnView) {
      return run();
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: options.threshold ?? 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, options?.triggerOnView, options?.threshold, decimals]);

  return { display, ref };
}