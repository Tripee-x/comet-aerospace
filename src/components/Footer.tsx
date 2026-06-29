import { Link } from "react-router-dom";
import { BRAND, NAV_LINKS } from "../data/content";
import { CometMark } from "./CometMark";
import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      {/* cinematic launch band — adds personality above the columns */}
      <div className="footer__band">
        <img
          className="footer__band-img"
          src={`${import.meta.env.BASE_URL}footer-launch.webp`}
          alt="A Comet Aerospace solid rocket motor on a live-fire launch test."
          loading="lazy"
          decoding="async"
          width={1920}
          height={760}
        />
        <div className="footer__band-scrim" aria-hidden />
        <div className="shell footer__band-copy">
          <span className="eyebrow">FLIGHT-PROVEN · MARCH 2026</span>
          <h2 className="display footer__band-head">We fly what we build.</h2>
        </div>
      </div>

      <div className="grid-bg" aria-hidden />
      <div className="shell footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__mark" aria-label={`${BRAND.name} home`}>
            <CometMark size={40} />
            <span className="footer__word display">{BRAND.name}</span>
          </Link>
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
        <span>Indigenous solid rocket motor propulsion · Pre-seed · India</span>
      </div>
    </footer>
  );
}
