/**
 * Comet Aerospace brand mark — the real chrome-planet logo (transparent PNG,
 * served as an optimized square WebP). Same API as before so nav/footer/
 * preloader keep working with a `size` (px) + `className`.
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
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.webp`}
      width={size}
      height={size}
      className={className}
      alt={title}
      decoding="async"
      style={{ display: "block", objectFit: "contain" }}
    />
  );
}
