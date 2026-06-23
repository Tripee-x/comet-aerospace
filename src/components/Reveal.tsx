import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/useReducedMotion";

interface Props {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Stagger children (direct element children) instead of the block itself. */
  stagger?: boolean;
  delay?: number;
  y?: number;
}

/**
 * Scroll-reveal wrapper. Animates transform + opacity only (GPU-friendly),
 * gates fully on reduced-motion, and cleans up its own ScrollTrigger.
 */
export function Reveal({
  children,
  as = "div",
  className,
  stagger = false,
  delay = 0,
  y = 28,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : [el];
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced, stagger, delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
