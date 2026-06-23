import { Link } from "react-router-dom";
import { BRAND, NAV_LINKS } from "../data/content";
import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="grid-bg" aria-hidden />
      <div className="shell footer__inner">
        <div className="footer__brand">
          <div className="footer__word display">{BRAND.name}</div>
          <p className="dim footer__tag">{BRAND.tagline}</p>
        </div>

        <div className="footer__col">
          <span className="mono">Navigate</span>
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="footer__link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="footer__col">
          <span className="mono">Contact</span>
          <a href={`mailto:${BRAND.email}`} className="footer__link">
            {BRAND.email}
          </a>
          <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="footer__link">
            {BRAND.phone}
          </a>
          <span className="footer__link faint">{BRAND.location}</span>
        </div>
      </div>

      <div className="shell footer__base mono">
        <span>
          &copy; {new Date().getFullYear()} {BRAND.name}
        </span>
        <span>Conceptual brand site. Non-operational by design.</span>
      </div>
    </footer>
  );
}
