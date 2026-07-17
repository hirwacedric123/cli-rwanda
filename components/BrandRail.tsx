type BrandRailProps = {
  className?: string;
};

/** Compact green → blue → orange mark echoing the CLI logo figures. */
export function BrandRail({ className = "" }: BrandRailProps) {
  return (
    <span className={`brand-rail ${className}`} aria-hidden>
      <span />
      <span />
      <span />
    </span>
  );
}
