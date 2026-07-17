import Image from "next/image";
import Link from "next/link";
import { BrandRail } from "@/components/BrandRail";
import { nav, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="h-1 w-full bg-[linear-gradient(90deg,var(--earth),var(--accent),var(--primary))]" aria-hidden />
      <div className="site-container-wide grid gap-10 py-12 sm:gap-12 sm:py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <BrandRail />
          <Link
            href="/"
            className="inline-flex min-h-[var(--touch)] items-center gap-3 rounded-full"
          >
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-logo-plate shadow-soft ring-1 ring-border">
              <Image
                src="/cli-logo-transparent.png"
                alt=""
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </span>
            <span>
              <span className="block font-display text-lg font-semibold text-primary">
                {site.fullName}
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.14em] text-muted">
                {site.name}
              </span>
            </span>
          </Link>
          <p className="prose-muted max-w-sm text-sm">
            {site.tagline}. A trusted partner to local changemakers in Rwanda and beyond.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Explore
          </h2>
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center text-sm font-medium text-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Contact
          </h2>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-10 items-center font-medium text-foreground transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </li>
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-accent"
                >
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="site-container-wide flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName} ({site.name}). All rights reserved.
          </p>
          <p>Counsel for resilient, community-led development.</p>
        </div>
      </div>
    </footer>
  );
}
