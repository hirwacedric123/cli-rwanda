import Image from "next/image";
import Link from "next/link";
import { BrandRail } from "@/components/BrandRail";
import { nav, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      {/* Tri-color brand band — ultra-thin, premium gradient */}
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, var(--earth) 0%, var(--accent) 48%, var(--primary) 100%)",
          opacity: 0.7,
        }}
        aria-hidden
      />

      {/* Gold hairline divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(155,123,56,0.18) 30%, rgba(201,168,92,0.28) 50%, rgba(155,123,56,0.18) 70%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="site-container-wide grid gap-10 py-14 sm:gap-12 sm:py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* Brand col */}
        <div className="space-y-5">
          <BrandRail />
          <Link
            href="/"
            className="inline-flex min-h-[var(--touch)] items-center gap-3 rounded-full transition-opacity duration-200 hover:opacity-80"
          >
            <span
              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[0.85rem]"
              style={{
                background:
                  "linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.72)) padding-box, linear-gradient(145deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0.28) 100%) border-box",
                border: "1px solid transparent",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), var(--shadow-xs)",
              }}
            >
              <Image
                src="/cli-logo-transparent.png"
                alt=""
                width={48}
                height={48}
                className="h-[80%] w-[80%] object-contain"
              />
            </span>
            <span>
              <span className="block font-display text-base font-semibold tracking-tight text-primary">
                {site.fullName}
              </span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">
                {site.name}
              </span>
            </span>
          </Link>
          <p className="prose-muted max-w-xs text-sm leading-relaxed">
            {site.tagline}. A trusted partner to local changemakers in Rwanda and beyond.
          </p>
        </div>

        {/* Explore col */}
        <div>
          <h2 className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted">
            Explore
          </h2>
          <ul className="space-y-0.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center text-sm font-medium text-foreground/80 transition-all duration-200 hover:translate-x-0.5 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact col */}
        <div>
          <h2 className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted">
            Contact
          </h2>
          <ul className="space-y-0.5 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-10 items-center font-medium text-foreground/80 transition-all duration-200 hover:translate-x-0.5 hover:text-accent"
              >
                {site.email}
              </a>
            </li>
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  className="inline-flex min-h-10 items-center text-muted transition-all duration-200 hover:translate-x-0.5 hover:text-accent"
                >
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="site-container-wide flex flex-col gap-2 py-5 text-[0.7rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="tracking-wide">
            © {year} {site.fullName} ({site.name}). All rights reserved.
          </p>
          <p className="tracking-[0.04em]">
            Counsel for resilient, community-led development.
          </p>
        </div>
      </div>
    </footer>
  );
}
