/**
 * Shared formatting utilities.
 */

/** Zero-pad a number to at least 2 digits: pad2(3) → "03", pad2(12) → "12". */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Resolves a root-relative public asset path against the app's base URL (e.g. "/Portfolio/" in production). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}