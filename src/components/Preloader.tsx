import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/useReducedMotion";
import { BRAND } from "../data/content";
import "./preloader.css";

/**
 * Radar preloader: rotating sweep, count-up, plasma ring. Fades itself out via
 * GSAP and calls onDone so the hero can take over. Under reduced motion it
 * resolves almost instantly.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline();

    tl.to(counter, {
      v: 100,
      duration: reduced ? 0.4 : 2.1,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(counter.v)),
    });

    tl.to(
      root.current,
      {
        autoAlpha: 0,
        duration: reduced ? 0.2 : 0.9,
        ease: "power2.inOut",
        onComplete: onDone,
      },
      "+=0.15"
    );

    return () => {
      tl.kill();
    };
  }, [onDone, reduced]);

  return (
    <div ref={root} className="pre" role="status" aria-live="polite">
      <div className="pre__center">
        <div className="pre__radar" aria-hidden>
          <span className="pre__ring r1" />
          <span className="pre__ring r2" />
          <span className="pre__ring r3" />
          <span className="pre__cross v" />
          <span className="pre__cross h" />
          {!reduced && <span className="pre__sweep" />}
          <span className="pre__blip b1" />
          <span className="pre__blip b2" />
        </div>

        <div className="pre__meta">
          <div className="pre__word tactical">{BRAND.name}</div>
          <div className="pre__sub mono">Establishing telemetry link</div>
          <div className="pre__bar">
            <span style={{ width: `${pct}%` }} />
          </div>
          <div className="pre__pct mono">
            <span>{String(pct).padStart(3, "0")}%</span>
            <span>SYS // ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
