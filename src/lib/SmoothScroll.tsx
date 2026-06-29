import { useEffect, useLayoutEffect, useRef } from "react";
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
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

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
      lenisRef.current = null;
    };
  }, [reduced]);

  // Reset to the TOP on every route change, before paint. Critically, Lenis
  // keeps its own scroll target, so window.scrollTo alone leaves the new page
  // wherever the previous one was (often the bottom) — reset Lenis too.
  useLayoutEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    // Recalculate trigger positions once the new page has laid out.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
