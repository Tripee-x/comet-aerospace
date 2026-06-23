import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../lib/useReducedMotion";

interface Props {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up from 0 to `to` the first time it scrolls into view. Uses
 * IntersectionObserver + rAF (no scroll listeners). Respects reduced motion by
 * rendering the final value immediately.
 */
export function Counter({ to, suffix = "", prefix = "", duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / (duration * 1000));
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setValue(Math.round(eased * to));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
