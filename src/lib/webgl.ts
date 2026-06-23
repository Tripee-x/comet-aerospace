/**
 * Cheap one-shot WebGL capability probe. Used to decide whether to mount the
 * Three.js hero or fall back to the static CSS/Canvas hero.
 */
let cached: boolean | null = null;

export function hasWebGL(): boolean {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return (cached = false);
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cached = !!gl;
  } catch {
    cached = false;
  }
  return cached;
}

/** Coarse device tier used to scale particle counts / dpr on weaker hardware. */
export function isLowPower(): boolean {
  if (typeof window === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mobile = window.matchMedia("(max-width: 820px)").matches;
  return mobile || cores <= 4;
}
