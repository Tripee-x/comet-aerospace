import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/useReducedMotion";
import { MISSION } from "../data/content";

/**
 * Mission manifesto. The quote is split into words and revealed on scroll with
 * a scrubbed stagger for a dramatic, reads-itself-aloud parallax.
 */
export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".mission__word");
      gsap.fromTo(
        words,
        { opacity: 0.12, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  const words = MISSION.quote.split(" ");

  return (
    <section ref={ref} className="section sec-mission">
      <div className="plasma-orb" style={{ width: 520, height: 520, background: "var(--c-purple)", left: "-8%", top: "10%" }} aria-hidden />
      <div className="plasma-orb" style={{ width: 460, height: 460, background: "var(--c-magenta)", right: "-6%", bottom: "0%" }} aria-hidden />
      <div className="shell mission__inner">
        <span className="eyebrow">{MISSION.eyebrow}</span>
        <blockquote className="mission__quote display">
          {words.map((w, i) => (
            <span key={i} className="mission__word">
              {w}{" "}
            </span>
          ))}
        </blockquote>
        <p className="lead mission__sub">{MISSION.sub}</p>
      </div>
    </section>
  );
}
