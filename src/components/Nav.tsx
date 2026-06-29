import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { BRAND, NAV_LINKS } from "../data/content";
import { TacticalButton } from "./TacticalButton";
import { CometMark } from "./CometMark";
import "./nav.css";

/**
 * Fixed premium nav. Hides on scroll-down, reveals on scroll-up, gains a
 * solid backdrop once past the fold. Mobile menu is a full-screen overlay.
 */
export function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const lastY = useRef(0);
  const { pathname } = useLocation();

  // On route change: close the mobile menu AND force the bar back into view
  // (the scroll-hide can leave it translated up when leaving a scrolled page).
  useEffect(() => {
    setOpen(false);
    setSolid(false);
    lastY.current = 0;
    gsap.set(barRef.current, { yPercent: 0 });
  }, [pathname]);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > 40);
        const goingDown = y > lastY.current && y > 240;
        if (!open) {
          gsap.to(barRef.current, {
            yPercent: goingDown ? -130 : 0,
            duration: 0.5,
            ease: "power3.out",
          });
        }
        lastY.current = y;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open]);

  return (
    <>
      <header ref={barRef} className={`nav ${solid ? "nav--solid" : ""}`}>
        <div className="nav__inner shell">
          <NavLink to="/" className="nav__brand" aria-label={`${BRAND.name} home`}>
            <CometMark size={26} className="nav__logo" />
            <span className="nav__word tactical">{BRAND.name}</span>
          </NavLink>

          <nav className="nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `nav__link ${isActive ? "is-active" : ""}`
                }
              >
                <span>{l.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="nav__cta">
            <TacticalButton to="/contact" variant="ghost">
              Initiate Contact
            </TacticalButton>
          </div>

          <button
            className={`nav__burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`navmenu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="navmenu__grid" />
        <nav className="navmenu__links" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className="navmenu__link"
              style={{ transitionDelay: `${0.06 * i + 0.1}s` }}
            >
              <span className="navmenu__no mono">0{i + 1}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="navmenu__foot mono">
          {BRAND.email} <br /> {BRAND.location}
        </div>
      </div>
    </>
  );
}
