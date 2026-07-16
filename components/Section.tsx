import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  narrow?: boolean;
};

export function Section({ children, className = "", id, narrow }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-24 md:py-28 ${className}`}>
      <div className={`mx-auto w-full ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
        {children}
      </div>
    </section>
  );
}
