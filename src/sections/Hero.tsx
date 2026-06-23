import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { heroProgress, PHASES } from "../lib/heroProgress";
import { useReducedMotion } from "../lib/useReducedMotion";
import { hasWebGL } from "../lib/webgl";
import { HeroScene } from "../three/HeroScene";
import { TacticalButton } from "../components/TacticalButton";
import { HERO_PHASES, HUD_LABELS, CAPABILITIES } from "../data/content";
import "./hero.css";

/** Triangular opacity envelope for a phase window with soft fade edges. */
function band(p: number, start: number, end: number, fade = 0.04) {
  if (p < start - fade || p > end + fade) return 0;
  const up = Math.min(1, (p - start + fade) / (fade * 2));
  const down = Math.min(1, (end + fade - p) / (fade * 2));
  return Math.max(0, Math.min(up, down));
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hudVehicleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ladderRef = useRef<HTMLDivElement>(null);
  const telSig = useRef<HTMLSpanElement>(null);
  const telFrame = useRef<HTMLSpanElement>(null);
  const phaseTag = useRef<HTMLSpanElement>(null);

  const reduced = useReducedMotion();
  const webgl = hasWebGL();

  useEffect(() => {
    if (reduced) {
      heroProgress.value = 0.18; // settle the static scene on a hero pose
      return;
    }
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          heroProgress.value = p;

          // --- phase text layers ---
          phaseRefs.current.forEach((el, i) => {
            if (!el) return;
            const start = PHASES[i];
            const end = i === HERO_PHASES.length - 1 ? 1.02 : PHASES[i + 1];
            const o = band(p, start, end);
            el.style.opacity = String(o);
            el.style.transform = `translateY(${(1 - o) * 26}px)`;
            el.style.visibility = o < 0.01 ? "hidden" : "visible";
          });

          // --- HUD labels around vehicle (phase 4: survey) ---
          if (hudVehicleRef.current) {
            const o = band(p, 0.38, 0.54, 0.05);
            hudVehicleRef.current.style.opacity = String(o);
          }

          // --- capability cards (phase 6) reveal one-by-one ---
          if (cardsRef.current) {
            const wrapO = band(p, 0.655, 0.79, 0.03);
            cardsRef.current.style.opacity = String(wrapO);
            cardsRef.current.style.visibility = wrapO < 0.01 ? "hidden" : "visible";
            const cards = cardsRef.current.querySelectorAll<HTMLElement>(".hcard");
            cards.forEach((c, i) => {
              const cs = 0.67 + i * 0.035;
              const co = Math.min(1, Math.max(0, (p - cs) / 0.03));
              c.style.opacity = String(co);
              c.style.transform = `translateY(${(1 - co) * 30}px)`;
            });
          }

          // --- CTA (final beat) appears after the standby silhouette ---
          if (ctaRef.current) {
            const o = band(p, 0.86, 1.02, 0.03);
            ctaRef.current.style.opacity = String(o);
            ctaRef.current.style.transform = `translateY(${(1 - o) * 24}px)`;
            ctaRef.current.style.visibility = o < 0.01 ? "hidden" : "visible";
          }

          // --- exit transition (phase 8): blur + fade + clip the stage out ---
          const exit = Math.max(0, (p - 0.95) / 0.05);
          stage.style.filter = `blur(${exit * 14}px)`;
          stage.style.opacity = String(1 - exit * 0.85);
          stage.style.clipPath = `inset(0 0 ${exit * 38}% 0)`;

          // --- telemetry + phase ladder ---
          if (telSig.current)
            telSig.current.textContent = (0.6 + p * 99.2).toFixed(1);
          if (telFrame.current)
            telFrame.current.textContent = String(Math.round(p * 480)).padStart(3, "0");

          const idx = PHASES.findIndex((b, i) => p >= b && p < (PHASES[i + 1] ?? 1.01));
          const active = idx < 0 ? HERO_PHASES.length - 1 : Math.min(idx, HERO_PHASES.length - 1);
          if (phaseTag.current)
            phaseTag.current.textContent = HERO_PHASES[active].tag;
          if (ladderRef.current) {
            ladderRef.current
              .querySelectorAll<HTMLElement>(".hladder__tick")
              .forEach((t, i) => t.classList.toggle("is-active", i === active));
          }
        },
      });
      return () => st.kill();
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className={`hero ${reduced ? "hero--static" : ""}`}
      aria-label="Comet Aerospace cinematic introduction"
    >
      <div ref={stageRef} className="hero__stage scanlines">
        {/* 3D / fallback layer */}
        <div className="hero__bg">
          {webgl ? (
            <HeroScene reduced={reduced} />
          ) : (
            <div className="hero__fallback" aria-hidden>
              <div className="hero__fallback-radar" />
              <div className="plasma-orb" style={{ width: 420, height: 420, background: "var(--c-magenta)", left: "20%", top: "30%" }} />
              <div className="plasma-orb" style={{ width: 380, height: 380, background: "var(--c-cyan)", right: "18%", bottom: "20%" }} />
            </div>
          )}
        </div>

        {/* fixed HUD frame */}
        <div className="hud" aria-hidden>
          <span className="hud__corner tl" />
          <span className="hud__corner tr" />
          <span className="hud__corner bl" />
          <span className="hud__corner br" />
          <span className="hud__crosshair v" />
          <span className="hud__crosshair h" />

          <div className="hud__top mono">
            <span ref={phaseTag}>SYS // INITIALIZE</span>
            <span>COMET // ATLAS-CLASS CONCEPT</span>
          </div>

          <div className="hud__tel mono">
            <div>
              SIG <span ref={telSig} className="hud__num">00.0</span>
            </div>
            <div>
              FRAME <span ref={telFrame} className="hud__num">000</span>
            </div>
          </div>

          <div ref={ladderRef} className="hladder">
            {HERO_PHASES.map((ph, i) => (
              <div key={ph.id} className="hladder__tick">
                <span className="hladder__no mono">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* HUD labels anchored around the vehicle (survey phase) */}
        <div ref={hudVehicleRef} className="vhud">
          {HUD_LABELS.map((l, i) => (
            <div key={l.id} className={`vhud__tag vhud__tag--${i}`}>
              <span className="vhud__dot" />
              <span className="mono">{l.label}</span>
              <span className="vhud__val mono">{l.value}</span>
            </div>
          ))}
        </div>

        {/* phase text overlays — the capability + release beats are carried by
            the cards and CTA blocks below, so their text overlays are skipped */}
        <div className="hero__copy">
          {HERO_PHASES.map((ph, i) => {
            if (ph.id === "capability" || ph.id === "exit") {
              phaseRefs.current[i] = null;
              return null;
            }
            return (
              <div
                key={ph.id}
                ref={(el) => (phaseRefs.current[i] = el)}
                className={`hphase hphase--${ph.id}`}
              >
                <span className="eyebrow">{ph.tag}</span>
                <h1 className={i === 0 ? "mega text-chrome" : "display h1"}>
                  {ph.title}
                </h1>
                <p className="lead">{ph.sub}</p>
                {i === 0 && (
                  <span className="hero__hint mono">Scroll to begin sequence</span>
                )}
              </div>
            );
          })}
        </div>

        {/* capability cards (phase 6) */}
        <div ref={cardsRef} className="hcards">
          <div className="hcards__head">
            <span className="eyebrow">PHASE 05 // CAPABILITY</span>
            <h2 className="display h3">Three disciplines, one trajectory.</h2>
          </div>
          <div className="hcards__grid">
            {CAPABILITIES.map((c) => (
              <article key={c.no} className="hcard panel bracketed">
                <span className="hcard__no mono">{c.no}</span>
                <span className="hcard__tag mono">{c.tag}</span>
                <h3 className="display h3">{c.title}</h3>
                <p className="dim">{c.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* CTA (final release beat) */}
        <div ref={ctaRef} className="hero__cta">
          <span className="eyebrow">PHASE 07 // RELEASE</span>
          <h2 className="display h1 text-plasma">Explore Systems.</h2>
          <div className="row">
            <TacticalButton to="/products" variant="solid" large>
              Explore Systems
            </TacticalButton>
            <TacticalButton to="/services" variant="ghost" large>
              View Services
            </TacticalButton>
          </div>
        </div>
      </div>

      {/* static-mode fallback copy (reduced motion) */}
      {reduced && (
        <div className="hero__static-copy shell">
          <span className="eyebrow">{HERO_PHASES[1].tag}</span>
          <h1 className="display h1">{HERO_PHASES[1].title}</h1>
          <p className="lead">{HERO_PHASES[4].title}</p>
          <div className="row">
            <TacticalButton to="/products" variant="solid" large>
              Explore Systems
            </TacticalButton>
            <TacticalButton to="/services" variant="ghost" large>
              View Services
            </TacticalButton>
          </div>
        </div>
      )}
    </section>
  );
}
