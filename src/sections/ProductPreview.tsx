import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { TacticalButton } from "../components/TacticalButton";
import { PRODUCTS } from "../data/content";

/** Product index preview — scroll-snap row of concept platforms. */
export function ProductPreview() {
  return (
    <section className="section sec-products">
      <div className="shell">
        <div className="prod__head">
          <Reveal>
            <span className="eyebrow">PRODUCT PORTFOLIO</span>
            <h2 className="display h2">Three products, one propulsion core.</h2>
          </Reveal>
          <TacticalButton to="/products" variant="ghost">
            All Products
          </TacticalButton>
        </div>
      </div>

      <div className="prod__rail" role="list">
        {PRODUCTS.map((p) => (
          <Link
            to="/products"
            key={p.no}
            className={`prod__card panel bracketed accent-${p.accent}`}
            role="listitem"
          >
            <div className="prod__viz" aria-hidden>
              <span className="prod__viz-core" />
              <span className="prod__viz-ring" />
            </div>
            <div className="prod__meta">
              <span className="mono prod__no">{p.no}</span>
              <span className="mono prod__kicker">{p.kicker}</span>
            </div>
            <h3 className="display h3">{p.name}</h3>
            <p className="dim">{p.summary}</p>
            <span className="prod__more mono">View product</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
