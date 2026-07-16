"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 px-3 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-[linear-gradient(to_bottom,var(--header-bg),transparent)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[6.25rem] max-w-6xl items-center justify-between gap-5 rounded-[1.85rem] border border-glass-border bg-header-panel px-5 shadow-soft backdrop-blur-xl sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3.5 rounded-full pr-2 transition-transform duration-300 hover:-translate-y-0.5"
          aria-label={`${site.fullName} home`}
        >
          <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.25rem] bg-logo-plate p-1 shadow-soft ring-1 ring-glass-border sm:h-[4.5rem] sm:w-[4.5rem]">
            <Image
              src="/logo.jpeg"
              alt=""
              width={72}
              height={72}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-xl font-semibold tracking-tight text-primary">
              Consilium
            </span>
            <span className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
              CLI-Rwanda
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1.5 rounded-full border border-glass-border bg-white/70 p-1.5 shadow-inner backdrop-blur-xl dark:bg-white/[0.08] md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-3 text-base font-semibold transition-all duration-300 ${
                  active
                    ? "bg-surface text-primary shadow-sm"
                    : "text-muted hover:bg-surface/70 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md sm:inline-flex"
          >
            Get in touch
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-foreground shadow-sm backdrop-blur-xl transition-colors hover:border-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`mx-auto mt-3 max-w-6xl overflow-hidden rounded-[1.5rem] border border-glass-border bg-header-panel shadow-soft backdrop-blur-xl md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="Mobile">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                  active
                    ? "bg-surface text-primary shadow-sm"
                    : "text-foreground hover:bg-surface/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white shadow-soft transition-colors hover:bg-accent-hover"
          >
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
