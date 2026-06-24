/**
 * Bridge between GSAP ScrollTrigger (DOM thread) and the R3F render loop.
 *
 * GSAP writes the pinned hero's scroll progress (0..1) here on every update;
 * the Three.js scene reads it inside useFrame. A plain mutable singleton keeps
 * this off the React render cycle entirely (no re-renders per frame).
 */
export const heroProgress = {
  /** Raw scroll progress of the pinned hero, 0 at entry, 1 at release. */
  value: 0,
};

// DEV-only: lets tooling drive the cinematic pose without scrolling.
if (import.meta.env.DEV && typeof window !== "undefined") {
  (window as unknown as { __heroProgress?: typeof heroProgress }).__heroProgress =
    heroProgress;
}

/** Phase boundaries from the creative brief (8 cinematic phases). */
export const PHASES = [0, 0.12, 0.25, 0.38, 0.52, 0.66, 0.78, 0.9, 1] as const;

/** Linear interpolate. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamp helper. */
export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

/**
 * Returns 0..1 progress *within* a phase window [start, end] given the global
 * hero progress. Useful for driving per-phase reactions in the 3D scene.
 */
export function phaseProgress(p: number, start: number, end: number): number {
  return clamp((p - start) / (end - start));
}
