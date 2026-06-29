import { useId } from "react";

/**
 * Comet Aerospace brand mark — a chrome planet crossed by two swept orbital
 * blades. Rebuilt as vector so it stays crisp at any size (nav, footer,
 * preloader). Self-contained gradients (unique ids per instance).
 */
export function CometMark({
  size = 28,
  className,
  title = "Comet Aerospace",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
    >
      <defs>
        <radialGradient id={`${id}-planet`} cx="40%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="42%" stopColor="#dbe1ec" />
          <stop offset="78%" stopColor="#9aa3b6" />
          <stop offset="100%" stopColor="#6f788c" />
        </radialGradient>
        <linearGradient id={`${id}-blade`} x1="6" y1="52" x2="60" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c6ccda" />
          <stop offset="48%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#aab2c4" />
        </linearGradient>
      </defs>

      {/* planet */}
      <circle cx="29" cy="32" r="19.5" fill={`url(#${id}-planet)`} />
      <circle cx="29" cy="32" r="19.5" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="0.8" />

      {/* upper blade (thin, sharp point upper-right) */}
      <path d="M16 39 C 30 35, 46 25, 60 15 C 47 26, 33 37, 18 43 Z" fill={`url(#${id}-blade)`} />
      {/* lower blade (bolder, the orbital ring foreground) */}
      <path d="M9 49 C 27 45, 45 31, 60 23 C 46 33, 30 45, 12 53 Z" fill={`url(#${id}-blade)`} />
      {/* specular highlight */}
      <ellipse cx="22" cy="24" rx="6" ry="4" fill="#ffffff" opacity="0.55" />
    </svg>
  );
}
