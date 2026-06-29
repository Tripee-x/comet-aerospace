import { Reveal } from "../components/Reveal";
import { CAPABILITIES } from "../data/content";

/**
 * Capability pillars as a sticky-heading + reveal index (not three equal
 * cards). Big ordinal numbers carry the rhythm.
 */
export function Capabilities() {
  return (
    <section className="section sec-cap">
      <div className="shell cap__grid">
        <div className="cap__aside">
          <span className="eyebrow">THE PROPULSION STACK</span>
          <h2 className="display h2">One motor, owned end to end.</h2>
          <p className="dim">
            Every product draws on the same in-house propulsion core, from the
            chemistry of the propellant to the control that puts it on target.
          </p>
        </div>

        <div className="cap__list">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.no} className="cap__row" delay={i * 0.05}>
              <span className="cap__no display">{c.no}</span>
              <div className="cap__copy">
                <div className="row cap__rowhead">
                  <h3 className="display h3">{c.title}</h3>
                  <span className="mono cap__tag">{c.tag}</span>
                </div>
                <p className="dim">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
