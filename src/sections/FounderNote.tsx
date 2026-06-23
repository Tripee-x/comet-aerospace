import { Reveal } from "../components/Reveal";
import { FOUNDER } from "../data/content";

export function FounderNote() {
  return (
    <section className="section sec-founder">
      <div className="shell founder__grid">
        <Reveal className="founder__media" aria-hidden>
          <div className="founder__sigil">
            <span className="founder__sigil-ring" />
            <span className="founder__sigil-core" />
            <span className="founder__initials display">AN</span>
          </div>
        </Reveal>

        <Reveal className="founder__body" delay={0.1}>
          <span className="eyebrow">{FOUNDER.eyebrow}</span>
          <blockquote className="founder__quote display">
            {FOUNDER.quote}
          </blockquote>
          <p className="dim">{FOUNDER.body}</p>
          <div className="founder__sign">
            <span className="founder__name tactical">{FOUNDER.name}</span>
            <span className="mono">{FOUNDER.role}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
