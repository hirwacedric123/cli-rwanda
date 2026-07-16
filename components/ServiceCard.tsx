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
      className="glass-panel group block rounded-[1.5rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-md"
    >
      {typeof index === "number" && (
        <span className="mb-4 inline-block font-display text-sm font-semibold tracking-wide text-earth">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
        {ctaLabel}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
