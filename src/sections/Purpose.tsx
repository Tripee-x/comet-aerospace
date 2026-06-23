import { Reveal } from "../components/Reveal";
import { PURPOSE } from "../data/content";

export function Purpose() {
  return (
    <section className="section sec-purpose">
      <div className="shell">
        <div className="purpose__grid">
          <Reveal className="purpose__lead">
            <span className="eyebrow">{PURPOSE.eyebrow}</span>
            <h2 className="display h2">{PURPOSE.title}</h2>
          </Reveal>

          <Reveal className="purpose__body" delay={0.1}>
            <p className="lead">{PURPOSE.body}</p>
            <ul className="purpose__stats" aria-label="Practice posture">
              {PURPOSE.stats.map((s) => (
                <li key={s.k}>
                  <span className="purpose__stat-v display">{s.v}</span>
                  <span className="mono">{s.k}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
