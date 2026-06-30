import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useReducedMotion } from "../lib/useReducedMotion";
import { TacticalButton } from "../components/TacticalButton";
import { BRAND, LAUNCH_SEQUENCE } from "../data/content";
import "./missileHero.css";

/* =====================================================================
   MISSILE HERO — Apple-style scroll-scrub frame sequence
   - 285 WebP frames in /public/frames (frame-0001.webp … frame-0285.webp)
   - GSAP ScrollTrigger pins THIS section and scrubs scroll → frame index
   - Frames painted to <canvas> (cover-fit + devicePixelRatio) for retina
   - Numeric preloader (0→100%) before scrubbing starts
   - Existing copy revealed at narrative beats, synced to scroll
   - prefers-reduced-motion → single static key frame, no pin
   ===================================================================== */

const TOTAL_FILES = 285;
const framePath = (n: number) =>
  `${import.meta.env.BASE_URL}frames/frame-${String(n).padStart(4, "0")}.webp`;

/** Soft triangular opacity envelope for a beat window. */
function band(p: number, start: number, end: number, fade = 0.045) {
  if (p < start - fade || p > end + fade) return 0;
  const up = Math.min(1, (p - start + fade) / (fade * 2));
  const down = Math.min(1, (end + fade - p) / (fade * 2));
  return Math.max(0, Math.min(up, down));
}

const LS = LAUNCH_SEQUENCE;

type Beat = {
  eyebrow: string;
  title: string;
  body: string;
  start: number;
  end: number;
  lead?: boolean;
};

/** Copy beats mapped to scroll progress (headline over launch, sequence over
 *  flight, CTA over arrival). All strings are the preserved existing copy. */
const BEATS: Beat[] = [
  { eyebrow: "COMET // SOLID ROCKET MOTORS", title: BRAND.tagline, body: "", start: 0.0, end: 0.14, lead: true },
  { eyebrow: LS[0].code, title: LS[0].title, body: LS[0].body, start: 0.15, end: 0.27 },
  { eyebrow: LS[1].code, title: LS[1].title, body: LS[1].body, start: 0.29, end: 0.42 },
  { eyebrow: LS[2].code, title: LS[2].title, body: LS[2].body, start: 0.44, end: 0.57 },
  { eyebrow: LS[3].code, title: LS[3].title, body: LS[3].body, start: 0.59, end: 0.72 },
  { eyebrow: LS[4].code, title: LS[4].title, body: LS[4].body, start: 0.74, end: 0.86 },
];

export function MissileHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const progLineRef = useRef<HTMLSpanElement>(null);

  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Subsample on mobile (download + decode budget); one key frame if reduced.
    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    const step = isMobile ? 2 : 1;
    const indices: number[] = [];
    if (reduced) {
      indices.push(Math.round(TOTAL_FILES * 0.46));
    } else {
      for (let i = 1; i <= TOTAL_FILES; i += step) indices.push(i);
    }
    const COUNT = indices.length;
    const images: HTMLImageElement[] = new Array(COUNT);

    let drawn = -1;
    let frameTarget = 0;
    let raf = 0;

    // cover-fit draw into the DPR-scaled backing store
    const draw = (i: number) => {
      const img = images[i];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number, dh: number;
      if (cr > ir) {
        dw = cw;
        dh = cw / ir;
      } else {
        dh = ch;
        dw = ch * ir;
      }
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      drawn = i;
    };

    // rAF-throttled: only repaint when the target frame actually changes
    const render = (i: number) => {
      frameTarget = i;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (frameTarget !== drawn) draw(frameTarget);
      });
    };

    const resize = () => {
      // Size to the sticky stage (one viewport), not the tall scroll section.
      const stage = stickyRef.current;
      const w = stage ? stage.clientWidth : window.innerWidth;
      const h = stage ? stage.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      draw(drawn < 0 ? 0 : drawn);
    };

    const updateText = (p: number) => {
      beatRefs.current.forEach((el, idx) => {
        if (!el) return;
        const b = BEATS[idx];
        const o = band(p, b.start, b.end);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 24}px, 0)`;
        el.style.visibility = o < 0.01 ? "hidden" : "visible";
      });
      if (ctaRef.current) {
        const o = band(p, 0.88, 1.04, 0.03);
        ctaRef.current.style.opacity = String(o);
        ctaRef.current.style.transform = `translate3d(0, ${(1 - o) * 22}px, 0)`;
        ctaRef.current.style.visibility = o < 0.01 ? "hidden" : "visible";
      }
      if (cueRef.current) cueRef.current.style.opacity = String(Math.max(0, 1 - p * 16));
      if (progLineRef.current) progLineRef.current.style.transform = `scaleX(${p})`;
      if (phaseRef.current) {
        const i = Math.min(LS.length - 1, Math.floor(p * LS.length));
        phaseRef.current.textContent = LS[i].code;
      }
    };

    // ---- preload with progress -------------------------------------------
    let loaded = 0;
    let cancelled = false;
    let gsapCtx: gsap.Context | null = null;

    const onProgress = () => {
      loaded += 1;
      setProgress(Math.round((loaded / COUNT) * 100));
      if (loaded === COUNT && !cancelled) start();
    };

    const start = () => {
      if (cancelled) return;
      setReady(true);
      resize();
      window.addEventListener("resize", resize);

      if (reduced) {
        draw(0);
        updateText(0.5);
        return;
      }

      // Scrub scroll → frame. NO GSAP pin: the stage is held with CSS
      // position:sticky instead, so GSAP never reparents a React-owned node
      // into a pin-spacer (which threw NotFoundError on navigation). The tall
      // .mhero section (700vh) provides the scroll distance; cleanup just kills
      // this one trigger via ctx.revert().
      gsapCtx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: resize,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (COUNT - 1));
            render(idx);
            updateText(self.progress);
          },
        });
      }, section);

      // Created late (after preload), so recalc positions for Lenis/layout.
      ScrollTrigger.refresh();
      updateText(0);
    };

    indices.forEach((no, k) => {
      const img = new Image();
      img.decoding = "async";
      images[k] = img;
      img.onload = () => {
        if (k === 0) {
          resize();
          draw(0); // paint first frame the instant it lands (no blank)
        }
        onProgress();
      };
      img.onerror = onProgress; // never stall the loader on a single miss
      img.src = framePath(no);
    });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
      gsapCtx?.revert();
      images.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className={`mhero ${reduced ? "mhero--static" : ""}`}
      aria-label="Comet Aerospace solid rocket motor launch sequence"
    >
      <div ref={stickyRef} className="mhero__sticky">
      <canvas ref={canvasRef} className="mhero__canvas" aria-hidden />
      <div className="mhero__scrim" aria-hidden />
      <div className="mhero__vignette" aria-hidden />

      {/* preloader */}
      {!ready && (
        <div className="mhero__loader" role="status" aria-live="polite">
          <div className="mhero__loader-inner">
            <span className="mono mhero__loader-label">{BRAND.name}</span>
            <div className="mhero__loader-num display">{progress}</div>
            <div className="mhero__loader-bar">
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
            <span className="mono mhero__loader-sub">Loading launch sequence</span>
          </div>
        </div>
      )}

      {/* HUD frame */}
      <div className="mhero__hud" aria-hidden>
        <span className="mhero__corner tl" />
        <span className="mhero__corner tr" />
        <span className="mhero__corner bl" />
        <span className="mhero__corner br" />
        <div className="mhero__hud-top mono">
          <span>COMET // SOLID ROCKET MOTOR PROPULSION</span>
          <span>PRE-SEED · INDIA</span>
        </div>
      </div>

      {/* synced copy beats */}
      <div className="mhero__copy">
        {BEATS.map((b, i) => (
          <div
            key={i}
            ref={(el) => (beatRefs.current[i] = el)}
            className={`mbeat ${b.lead ? "mbeat--lead" : ""}`}
          >
            <span className="eyebrow">{b.eyebrow}</span>
            {b.lead ? (
              <h1 className="display mhero__headline">{b.title}</h1>
            ) : (
              <h2 className="display mbeat__title">{b.title}</h2>
            )}
            {b.body && <p className="mbeat__body">{b.body}</p>}
          </div>
        ))}

        <div ref={ctaRef} className="mhero__cta">
          <span className="eyebrow">ENGAGE</span>
          <div className="row mhero__cta-row">
            <TacticalButton to="/contact" variant="solid" large>
              Initiate Contact
            </TacticalButton>
            <TacticalButton to="/products" variant="ghost" large>
              Explore Products
            </TacticalButton>
          </div>
        </div>
      </div>

      {/* bottom HUD: phase label + scrub progress */}
      <div className="mhero__phasebar" aria-hidden>
        <span ref={phaseRef} className="mono">
          {LS[0].code}
        </span>
        <span className="mhero__prog">
          <span ref={progLineRef} className="mhero__prog-fill" />
        </span>
      </div>

      {/* scroll cue (pinned bottom-center) */}
      <div ref={cueRef} className="mhero__cue" aria-hidden>
        <span className="mono">SCROLL</span>
        <span className="mhero__cue-line" />
      </div>
      </div>

      {/* reduced-motion static copy */}
      {reduced && (
        <div className="mhero__static shell">
          <span className="eyebrow">{BEATS[0].eyebrow}</span>
          <h1 className="display mhero__headline">{BRAND.tagline}</h1>
          <p className="mbeat__body">{LS[1].body}</p>
          <div className="row">
            <TacticalButton to="/contact" variant="solid" large>
              Initiate Contact
            </TacticalButton>
            <TacticalButton to="/products" variant="ghost" large>
              Explore Products
            </TacticalButton>
          </div>
        </div>
      )}
    </section>
  );
}
