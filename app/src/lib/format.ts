/**
 * Shared formatting utilities.
 */

/** Zero-pad a number to at least 2 digits: pad2(3) → "03", pad2(12) → "12". */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}