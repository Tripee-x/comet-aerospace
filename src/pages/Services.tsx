import { Reveal } from "../components/Reveal";
import { TacticalButton } from "../components/TacticalButton";
import { SERVICES } from "../data/content";
import "./pages.css";

export function Services() {
  return (
    <main className="page">
      <header className="pagehead">
        <div className="grid-bg" aria-hidden />
        <div className="shell pagehead__inner">
          <span className="eyebrow">SERVICES // ADVISORY</span>
          <h1 className="display h1">
            We consult aerospace companies and <span className="text-plasma">defense startups</span>.
          </h1>
          <p className="lead">
            Comet Aerospace partners with founders and teams building hard
            aerospace and defense-technology concepts. We bring strategy,
            structure, and storytelling, the work that turns a complex idea into
            a program people can fund and trust.
          </p>
        </div>
      </header>

      <section className="section servpage">
        <div className="shell servpage__grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.no} className="servcard panel bracketed" delay={(i % 3) * 0.06}>
              <span className="servcard__no display">{s.no}</span>
              <h2 className="display h3">{s.title}</h2>
              <p className="dim">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section servpage__band">
        <Reveal className="shell servpage__band-inner">
          <span className="eyebrow">ENGAGEMENT POSTURE</span>
          <h2 className="display h2">
            Conceptual, strategic, and high-craft. We stop where operational
            detail begins.
          </h2>
          <div className="row">
            <TacticalButton to="/contact" variant="solid" large>
              Initiate Contact
            </TacticalButton>
            <TacticalButton to="/products" variant="ghost" large>
              See Concept Platforms
            </TacticalButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
