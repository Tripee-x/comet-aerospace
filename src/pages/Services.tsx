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
          <span className="eyebrow">CAPABILITY // PROPULSION STACK</span>
          <h1 className="display h1">
            From propellant chemistry to a <span className="text-plasma">flight-proven motor</span>.
          </h1>
          <p className="lead">
            Comet Aerospace is one vertically integrated team that owns the whole
            propulsion stack. We formulate the propellant, engineer the casing
            and nozzle, control the flight, and fly what we build.
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
