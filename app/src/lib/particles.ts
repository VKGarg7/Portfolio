/**
 * Shared particle/decorative-element generators.
 */

/** Generate an array of indices [0, 1, ..., count-1] for mapping decorative elements. */
export function makeParticles(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i);
}

/** Generate particles with deterministic pseudo-random positions for CSS custom properties. */
export function makeParticlePositions(
  count: number,
  seedX = 37,
  seedY = 13
): { index: number; x: number; y: number }[] {
  return Array.from({ length: count }, (_, i) => ({
    index: i,
    x: (i * seedX) % 100,
    y: 25 + ((i * seedY) % 75),
  }));
}