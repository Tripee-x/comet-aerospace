import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useReducedMotion } from "../lib/useReducedMotion";
import "./interior.css";

/**
 * "Step inside the platform." A pinned, scroll-driven sequence that flies the
 * viewer through a CSS-3D structural corridor (immersion) while readable data
 * panels for each interior bay crossfade in on the left. An iris hatch opens at
 * entry and seals at exit, so it reads as moving into a different, enclosed
 * space. All copy is conceptual: structure, avionics, telemetry, mission bay.
 */
const BAYS = [
  {
    code: "BAY 00 // AIRLOCK",
    title: "Crossing the threshold.",
    body: "Pressure equalized. You are now inside the concept platform, past the hull and into the architecture.",
  },
  {
    code: "BAY 01 // STRUCTURAL SPINE",
    title: "The load-bearing lattice.",
    body: "A continuous spine that carries the platform. We model it for resilience first, so every other system has something honest to attach to.",
  },
  {
    code: "BAY 02 // AVIONICS LATTICE",
    title: "Where the intelligence lives.",
    body: "Compute and sensing organized as a legible system, framed so reviewers can reason about it without operational detail.",
  },
  {
    code: "BAY 03 // TELEMETRY CORE",
    title: "The nervous system.",
    body: "Sensing, framing, and reporting. The core that turns a platform into a story it can tell about itself.",
  },
  {
    code: "BAY 04 // MISSION DECK",
    title: "Configurable by intent.",
    body: "A concept space defined by purpose, not by hardware. This is where ambition becomes a credible plan.",
  },
];

const RING_COUNT = 10;
const RING_GAP = 560; // px of z between rings
const TRAVEL = RING_COUNT * RING_GAP;

function band(p: number, start: number, end: number, fade = 0.05) {
  if (p < start - fade || p > end + fade) return 0;
  const up = Math.min(1, (p - start + fade) / (fade * 2));
  const down = Math.min(1, (end + fade - p) / (fade * 2));
  return Math.max(0, Math.min(up, down));
}

export function InteriorBay() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const tunnel = useRef<HTMLDivElement>(null);
  const iris = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const depth = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current || !stage.current) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        pin: stage.current,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          // fly the corridor toward the viewer
          if (tunnel.current) {
            tunnel.current.style.transform = `translateZ(${p * TRAVEL}px)`;
          }

          // iris hatch: opens 0 -> 0.08, seals 0.92 -> 1
          if (iris.current) {
            let r = 0;
            if (p < 0.09) r = (p / 0.09) * 75;
            else if (p > 0.9) r = (1 - (p - 0.9) / 0.1) * 75;
            else r = 75;
            iris.current.style.clipPath = `circle(${r}% at 50% 50%)`;
          }

          // readable bay panels crossfade across the run
          const span = 0.82 / BAYS.length;
          panels.current.forEach((el, i) => {
            if (!el) return;
            const start = 0.06 + i * span;
            const o = band(p, start, start + span * 0.9, 0.035);
            el.style.opacity = String(o);
            el.style.transform = `translateX(${(1 - o) * -28}px)`;
            el.style.visibility = o < 0.01 ? "hidden" : "visible";
          });

          if (depth.current) {
            depth.current.textContent = `${Math.round(p * TRAVEL)}`.padStart(4, "0");
          }
        },
      });
      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className={`interior ${reduced ? "interior--static" : ""}`}
      aria-label="Inside the platform"
    >
      <div ref={stage} className="interior__stage scanlines">
        {/* iris hatch */}
        <div ref={iris} className="interior__iris">
          <div className="interior__scene">
            {/* CSS-3D corridor */}
            <div className="interior__tunnel" ref={tunnel}>
              {Array.from({ length: RING_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className="iring"
                  style={{ transform: `translate(-50%, -50%) translateZ(${-i * RING_GAP}px)` }}
                >
                  <span className="iring__seg t" />
                  <span className="iring__seg r" />
                  <span className="iring__seg b" />
                  <span className="iring__seg l" />
                  <span className="iring__node n1" />
                  <span className="iring__node n2" />
                </div>
              ))}
            </div>

            {/* center reticle */}
            <div className="interior__reticle" aria-hidden>
              <span />
              <span />
            </div>
          </div>
        </div>

        {/* fixed HUD */}
        <div className="interior__hud">
          <span className="mono">INTERIOR // SYSTEMS WALKTHROUGH</span>
          <span className="mono">
            DEPTH <span ref={depth} className="interior__depth">0000</span> U
          </span>
        </div>

        {/* readable bay panels */}
        <div className="interior__panels">
          {BAYS.map((b, i) => (
            <div
              key={b.code}
              ref={(el) => (panels.current[i] = el)}
              className="ibay panel bracketed"
            >
              <span className="eyebrow">{b.code}</span>
              <h2 className="display h2">{b.title}</h2>
              <p className="lead">{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* reduced-motion static fallback */}
      {reduced && (
        <div className="interior__static shell">
          <span className="eyebrow">INTERIOR // SYSTEMS</span>
          <h2 className="display h2">Inside the platform.</h2>
          <div className="interior__static-grid">
            {BAYS.map((b) => (
              <div key={b.code} className="panel bracketed ibay">
                <span className="eyebrow">{b.code}</span>
                <h3 className="display h3">{b.title}</h3>
                <p className="dim">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
