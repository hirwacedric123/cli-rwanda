import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href?: string;
  index?: number;
  ctaLabel?: string;
};

export function ServiceCard({
  title,
  description,
  href = "/services",
  index,
  ctaLabel = "Learn more",
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="glass-panel interactive-lift group flex h-full flex-col rounded-[1.5rem] p-6 focus-visible:border-accent/45 focus-visible:shadow-md"
    >
      {typeof index === "number" && (
        <span
          className={`mb-4 inline-block font-display text-sm font-semibold tracking-wide ${
            index % 3 === 0 ? "text-earth" : index % 3 === 1 ? "text-accent" : "text-primary"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent group-focus-visible:text-accent">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{description}</p>
      <span className="mt-5 inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-300 group-hover:gap-2.5 group-focus-visible:gap-2.5">
        {ctaLabel}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
