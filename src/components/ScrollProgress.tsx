import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/** Thin plasma rail across the top, scaled to document scroll progress. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(ref.current, { scaleX: self.progress });
      },
    });
    return () => st.kill();
  }, []);

  return <div ref={ref} className="progress" aria-hidden />;
}
