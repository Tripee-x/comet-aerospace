import { Reveal } from "../components/Reveal";
import { TacticalButton } from "../components/TacticalButton";
import { SERVICES } from "../data/content";

/** Services preview — grouped two-column divided index. */
export function ServicesPreview() {
  return (
    <section className="section sec-services">
      <div className="shell">
        <div className="serv__head">
          <Reveal>
            <span className="eyebrow">CAPABILITY</span>
            <h2 className="display h2">
              We own the whole propulsion stack.
            </h2>
            <p className="lead">
              Propellant and grain, casing and nozzle, thrust and flight
              control, and the live-fire testing that proves it. In-house.
            </p>
          </Reveal>
        </div>

        <Reveal className="serv__list" stagger>
          {SERVICES.slice(0, 6).map((s) => (
            <div key={s.no} className="serv__row">
              <span className="serv__no mono">{s.no}</span>
              <h3 className="tactical serv__title">{s.title}</h3>
              <p className="dim serv__body">{s.body}</p>
            </div>
          ))}
        </Reveal>

        <div className="serv__cta">
          <TacticalButton to="/services" variant="ghost" large>
            Explore Services
          </TacticalButton>
        </div>
      </div>
    </section>
  );
}
