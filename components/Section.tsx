import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  narrow?: boolean;
  wide?: boolean;
};

export function Section({ children, className = "", id, narrow, wide }: SectionProps) {
  const widthClass = narrow
    ? "site-container-narrow"
    : wide === false
      ? "site-container"
      : "site-container-wide";

  return (
    <section
      id={id}
      className={`py-[var(--section-y)] ${id ? "scroll-mt-[var(--header-offset)]" : ""} ${className}`}
    >
      <div className={`w-full ${widthClass}`}>{children}</div>
    </section>
  );
}
