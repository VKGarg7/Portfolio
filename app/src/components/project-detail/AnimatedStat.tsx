import { AnimatedCountUp } from "../AnimatedCountUp";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  duration?: number;
}

/** Counts up from 0 to `value` once it scrolls into view. */
export function AnimatedStat({ value, suffix = "", duration = 1400 }: AnimatedStatProps) {
  return <AnimatedCountUp value={value} suffix={suffix} duration={duration} triggerOnView />;
}
