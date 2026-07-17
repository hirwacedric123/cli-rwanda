import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href?: string;
  index?: number;
  ctaLabel?: string;
};

const indexColor = (i: number) =>
  i % 3 === 0 ? "text-earth" : i % 3 === 1 ? "text-accent" : "text-primary";

const indexGlow = (i: number) =>
  i % 3 === 0
    ? "group-hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.52),0_12px_40px_rgba(28,108,54,0.15),0_4px_14px_rgba(28,108,54,0.08)]"
    : i % 3 === 1
      ? "group-hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.52),0_12px_40px_rgba(7,105,162,0.15),0_4px_14px_rgba(7,105,162,0.08)]"
      : "group-hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.52),0_12px_40px_rgba(191,94,24,0.15),0_4px_14px_rgba(191,94,24,0.08)]";

export function ServiceCard({
  title,
  description,
  href = "/services",
  index = 0,
  ctaLabel = "Learn more",
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={`group card-premium relative flex h-full flex-col rounded-[1.5rem] p-6 focus-visible:ring-2 focus-visible:ring-accent/40 ${indexGlow(index)}`}
    >
      {/* Index number — refined metallic */}
      <span
        className={`mb-4 inline-block font-display text-xs font-bold tracking-[0.18em] uppercase ${indexColor(index)}`}
        style={{ opacity: 0.75 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3
        className={`font-display text-xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:${indexColor(index).replace("text-", "text-")}`}
      >
        {title}
      </h3>

      <p className="prose-muted mt-3 flex-1 text-sm">{description}</p>

      {/* CTA row */}
      <span
        className={`mt-6 inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${indexColor(index)} group-hover:gap-3`}
      >
        {ctaLabel}
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>

      {/* Hairline bottom accent — appears on hover */}
      <div
        className="absolute inset-x-6 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            index % 3 === 0
              ? "linear-gradient(90deg, transparent, rgba(28,108,54,0.40), transparent)"
              : index % 3 === 1
                ? "linear-gradient(90deg, transparent, rgba(7,105,162,0.40), transparent)"
                : "linear-gradient(90deg, transparent, rgba(191,94,24,0.40), transparent)",
        }}
        aria-hidden
      />
    </Link>
  );
}
