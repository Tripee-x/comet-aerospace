import { Reveal } from "../components/Reveal";
import { TacticalButton } from "../components/TacticalButton";

export function FinalCTA() {
  return (
    <section className="section sec-finalcta">
      <div className="grid-bg" aria-hidden />
      <div className="plasma-orb" style={{ width: 600, height: 600, background: "var(--c-magenta)", left: "50%", top: "50%", translate: "-50% -50%" }} aria-hidden />
      <Reveal className="shell finalcta__inner">
        <span className="eyebrow">INITIATE CONTACT</span>
        <h2 className="mega text-chrome">Build the motor with us.</h2>
        <p className="lead">
          Propulsion partners, programs, and pre-seed investors: we own the
          stack from propellant to a motor that has already flown. Let us talk.
        </p>
        <div className="row finalcta__row">
          <TacticalButton to="/contact" variant="solid" large>
            Initiate Contact
          </TacticalButton>
          <TacticalButton to="/products" variant="ghost" large>
            Explore Products
          </TacticalButton>
        </div>
      </Reveal>
    </section>
  );
}
