import { Link } from "react-router-dom";

type Variant = "solid" | "ghost" | "outline";

interface Props {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  large?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const cls = (variant: Variant, large?: boolean, extra?: string) =>
  [
    "btn",
    variant === "solid" && "btn--solid",
    variant === "ghost" && "btn--ghost",
    large && "btn--lg",
    extra,
  ]
    .filter(Boolean)
    .join(" ");

/** Tactical CTA with animated corner brackets + sliding plasma fill. */
export function TacticalButton({
  children,
  to,
  href,
  onClick,
  variant = "outline",
  large,
  className,
  type = "button",
}: Props) {
  const inner = (
    <>
      <span className="bracket tl" aria-hidden />
      {children}
      <span className="bracket br" aria-hidden />
    </>
  );
  const klass = cls(variant, large, className);

  if (to) {
    return (
      <Link to={to} className={klass} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={klass} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={klass} onClick={onClick}>
      {inner}
    </button>
  );
}
