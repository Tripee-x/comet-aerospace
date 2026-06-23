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
            <span className="eyebrow">ADVISORY</span>
            <h2 className="display h2">
              We consult aerospace companies and defense startups.
            </h2>
            <p className="lead">
              From first concept to investor-grade narrative, we give serious
              programs the clarity they deserve.
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
