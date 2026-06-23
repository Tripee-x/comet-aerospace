import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * App-level smooth scroll. Wires Lenis to GSAP's ticker so ScrollTrigger and
 * Lenis share a single RAF loop (no double-RAF jank). Disabled entirely under
 * reduced-motion, where native scrolling is the correct, accessible default.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    // Keep ScrollTrigger in sync with Lenis position.
    lenis.on("scroll", ScrollTrigger.update);

    // DEV-only handle so tooling can drive scroll the way Lenis expects.
    if (import.meta.env.DEV) (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  // Reset scroll + recalc triggers on every route change.
  useEffect(() => {
    window.scrollTo(0, 0);
    // Let the new page mount and fonts settle before measuring.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
