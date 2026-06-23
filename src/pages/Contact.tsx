import { useState } from "react";
import { TacticalButton } from "../components/TacticalButton";
import { BRAND, INQUIRY_TYPES } from "../data/content";
import "./pages.css";

type Form = {
  name: string;
  email: string;
  org: string;
  inquiry: string;
  message: string;
};

const EMPTY: Form = { name: "", email: "", org: "", inquiry: INQUIRY_TYPES[0], message: "" };

export function Contact() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const set = (k: keyof Form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.message.trim()) next.message = "Tell us a little about the concept";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Frontend-only: no network call, no backend. Just a simulated success state.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setSent(false);
  };

  return (
    <main className="page">
      <header className="pagehead">
        <div className="grid-bg" aria-hidden />
        <div className="shell pagehead__inner">
          <span className="eyebrow">CONTACT // SECURE CHANNEL</span>
          <h1 className="display h1">
            Open a <span className="text-plasma">line</span>.
          </h1>
          <p className="lead">
            Bring us the concept that is hard to explain. We will help you make
            it clear, credible, and ready for the room that matters.
          </p>
        </div>
      </header>

      <section className="section contact">
        <div className="shell contact__grid">
          {/* details */}
          <aside className="contact__info">
            <div className="contact__block">
              <span className="mono">Founder</span>
              <p className="display contact__big">{BRAND.founder}</p>
              <p className="dim">{BRAND.role}</p>
            </div>
            <hr className="hairline" />
            <div className="contact__block">
              <span className="mono">Email</span>
              <a className="contact__line" href={`mailto:${BRAND.email}`}>
                {BRAND.email}
              </a>
            </div>
            <div className="contact__block">
              <span className="mono">Phone</span>
              <a className="contact__line" href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>
                {BRAND.phone}
              </a>
            </div>
            <div className="contact__block">
              <span className="mono">Location</span>
              <p className="contact__line">{BRAND.location}</p>
            </div>
          </aside>

          {/* form */}
          <div className="contact__formwrap panel bracketed">
            {sent ? (
              <div className="contact__success" role="status" aria-live="polite">
                <span className="contact__check" aria-hidden>
                  <span />
                </span>
                <h2 className="display h3">Transmission received.</h2>
                <p className="dim">
                  Thank you, {form.name.split(" ")[0] || "operator"}. This is a
                  concept demo, so nothing was actually sent, but in a live build
                  your inquiry would now be in our queue. We would reply to{" "}
                  <strong>{form.email}</strong> within two working days.
                </p>
                <TacticalButton onClick={reset} variant="ghost">
                  Send another
                </TacticalButton>
              </div>
            ) : (
              <form className="contact__form" onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={set("name")}
                    aria-invalid={!!errors.name}
                    autoComplete="name"
                  />
                  {errors.name && <span className="field__err mono">{errors.name}</span>}
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                  />
                  {errors.email && <span className="field__err mono">{errors.email}</span>}
                </div>

                <div className="field">
                  <label htmlFor="org">Organization</label>
                  <input
                    id="org"
                    value={form.org}
                    onChange={set("org")}
                    autoComplete="organization"
                    placeholder="Optional"
                  />
                </div>

                <div className="field">
                  <label htmlFor="inquiry">Inquiry Type</label>
                  <select id="inquiry" value={form.inquiry} onChange={set("inquiry")}>
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field field--full">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span className="field__err mono">{errors.message}</span>
                  )}
                </div>

                <div className="contact__submit">
                  <TacticalButton type="submit" variant="solid" large>
                    Transmit Inquiry
                  </TacticalButton>
                  <span className="mono faint">Frontend demo. No data leaves your browser.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
