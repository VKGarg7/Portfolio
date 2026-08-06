import { useCountUp } from "../hooks/useCountUp";

interface AnimatedCountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  /** When true, starts counting only once the element scrolls into view. */
  triggerOnView?: boolean;
  threshold?: number;
  /** Number of decimal places to display (e.g. 2 for 8.07). */
  decimals?: number;
}

/**
 * Shared animated count-up component. Counts from 0 to `value` using a
 * cubic ease-out curve. Optionally triggers when scrolled into view.
 */
export function AnimatedCountUp({
  value,
  suffix = "",
  duration = 1400,
  triggerOnView = false,
  threshold = 0.4,
  decimals = 0,
}: AnimatedCountUpProps) {
  const { display, ref } = useCountUp(value, duration, { triggerOnView, threshold, decimals });

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}