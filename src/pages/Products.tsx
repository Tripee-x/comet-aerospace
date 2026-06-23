import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { Counter } from "../components/Counter";
import { TacticalButton } from "../components/TacticalButton";
import { PRODUCTS, SERVICES } from "../data/content";
import "./pages.css";

export function Products() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];

  return (
    <main className="page">
      <header className="pagehead">
        <div className="grid-bg" aria-hidden />
        <div className="shell pagehead__inner">
          <span className="eyebrow">PRODUCTS // CONCEPT PLATFORMS</span>
          <h1 className="display h1">
            Three concepts, framed for <span className="text-plasma">credibility</span>.
          </h1>
          <p className="lead">
            Each platform below is a conceptual study, a narrative and design
            exercise in how a serious aerospace idea should look, read, and be
            reasoned about. Everything here stays high-level and non-operational.
          </p>
          <p className="mono pagehead__note">
            No specifications. No range, payload, propulsion, guidance, or
            deployment detail. Concept and presentation only.
          </p>
        </div>
      </header>

      {/* metric strip */}
      <section className="metricstrip">
        <div className="shell metricstrip__grid">
          <div className="metric">
            <span className="metric__v display">
              <Counter to={3} />
            </span>
            <span className="mono">Concept domains</span>
          </div>
          <div className="metric">
            <span className="metric__v display">
              <Counter to={SERVICES.length} />
            </span>
            <span className="mono">Advisory services</span>
          </div>
          <div className="metric">
            <span className="metric__v display">
              <Counter to={100} suffix="%" />
            </span>
            <span className="mono">Conceptual posture</span>
          </div>
          <div className="metric">
            <span className="metric__v display">
              <Counter to={0} prefix="0" />
            </span>
            <span className="mono">Operational details</span>
          </div>
        </div>
      </section>

      {/* interactive platform selector */}
      <section className="section selector">
        <div className="shell">
          <Reveal className="selector__head">
            <span className="eyebrow">PLATFORM SELECTOR</span>
            <h2 className="display h2">Inspect each concept.</h2>
          </Reveal>

          <div className="selector__body">
            <div className="selector__tabs" role="tablist" aria-label="Concept platforms">
              {PRODUCTS.map((item, i) => (
                <button
                  key={item.no}
                  role="tab"
                  aria-selected={i === active}
                  className={`seltab ${i === active ? "is-active" : ""} accent-${item.accent}`}
                  onClick={() => setActive(i)}
                >
                  <span className="seltab__no mono">{item.no}</span>
                  <span className="seltab__name tactical">{item.name}</span>
                  <span className="seltab__kick mono">{item.kicker}</span>
                </button>
              ))}
            </div>

            <div
              key={active}
              className={`selector__detail panel bracketed accent-${p.accent}`}
              role="tabpanel"
            >
              <div className="selector__viz" aria-hidden>
                <span className="prodrow__core" />
                <span className="prodrow__ring r1" />
                <span className="prodrow__ring r2" />
                <span className="prodrow__grid" />
                <span className="prodrow__code mono">{p.no}</span>
              </div>
              <div className="selector__copy">
                <span className="mono prodrow__kicker">{p.kicker}</span>
                <h3 className="display h3">{p.name}</h3>
                <p className="lead">{p.summary}</p>
                <p className="dim">{p.desc}</p>
                <ul className="prodrow__tags">
                  {p.tags.map((t) => (
                    <li key={t} className="tag mono">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* full conceptual rows */}
      <section className="section prodpage">
        <div className="shell">
          {PRODUCTS.map((item, i) => (
            <Reveal
              key={item.no}
              className={`prodrow accent-${item.accent} ${i % 2 ? "prodrow--rev" : ""}`}
            >
              <div className="prodrow__viz bracketed" aria-hidden>
                <span className="prodrow__core" />
                <span className="prodrow__ring r1" />
                <span className="prodrow__ring r2" />
                <span className="prodrow__grid" />
                <span className="prodrow__code mono">{item.no}</span>
              </div>
              <div className="prodrow__body">
                <span className="mono prodrow__kicker">{item.kicker}</span>
                <h2 className="display h2">{item.name}</h2>
                <p className="lead">{item.summary}</p>
                <p className="dim">{item.desc}</p>
                <ul className="prodrow__tags">
                  {item.tags.map((t) => (
                    <li key={t} className="tag mono">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section prodpage__cta">
        <Reveal className="shell prodpage__cta-inner">
          <h2 className="display h2">Want a concept framed like this?</h2>
          <TacticalButton to="/contact" variant="solid" large>
            Initiate Contact
          </TacticalButton>
        </Reveal>
      </section>
    </main>
  );
}
