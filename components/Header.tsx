"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

function pathMatches(pathname: string, href: string) {
  const [path, hash] = href.split("#");
  const base = path || "/";
  if (hash) {
    if (base === "/" && pathname === "/") return false;
    return pathname === base;
  }
  return pathname === base;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace(/^#/, ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setHash(window.location.hash.replace(/^#/, ""));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function isActive(href: string) {
    const [path, itemHash] = href.split("#");
    const base = path || "/";

    if (itemHash) {
      return pathname === base && hash === itemHash;
    }

    if (href === "/") return pathname === "/" && !hash;
    return pathMatches(pathname, href) && !["team", "testimonials"].includes(hash);
  }

  function handleNavClick(href: string) {
    const [, itemHash] = href.split("#");
    setHash(itemHash || "");
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[linear-gradient(to_bottom,var(--header-bg)_0%,var(--header-bg)_55%,transparent_100%)]"
          : "bg-transparent"
      }`}
    >
      <div className="px-3 py-3 sm:px-4 sm:py-4">
        <div className="site-container-wide flex h-[var(--header-height)] items-center justify-between gap-3 rounded-[1.35rem] border border-glass-border bg-header-panel px-3 shadow-soft backdrop-blur-xl sm:gap-4 sm:rounded-[1.6rem] sm:px-5">
          <Link
            href="/"
            className="group flex min-h-[var(--touch)] items-center gap-2.5 rounded-full pr-1 transition-transform duration-300 hover:-translate-y-0.5 sm:gap-3.5"
            aria-label={`${site.fullName} home`}
            onClick={() => setOpen(false)}
          >
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[1rem] bg-logo-plate p-1 shadow-soft ring-1 ring-glass-border sm:h-14 sm:w-14 sm:rounded-[1.15rem]">
              <Image
                src="/cli-logo-transparent.png"
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="hidden min-[400px]:flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold tracking-tight text-primary sm:text-xl">
                Consilium
              </span>
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted sm:text-[0.78rem]">
                CLI-Rwanda
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-glass-border bg-white/70 p-1 shadow-inner backdrop-blur-xl dark:bg-white/[0.08] lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 xl:px-5 xl:text-base ${
                    active
                      ? "bg-surface text-primary shadow-sm"
                      : "text-muted hover:bg-surface/70 hover:text-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link href="/contact" className="btn-primary hidden sm:inline-flex !py-2.5 text-sm">
              Get in touch
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-glass-bg text-foreground shadow-sm backdrop-blur-xl transition-colors hover:border-accent lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-foreground/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <div
        id={menuId}
        ref={panelRef}
        className={`absolute inset-x-3 top-[calc(var(--header-height)+1.35rem)] z-50 origin-top transition-all duration-300 sm:inset-x-4 lg:hidden ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav
          className="site-container-wide flex flex-col gap-1 rounded-[1.35rem] border border-glass-border bg-header-panel p-3 shadow-soft backdrop-blur-xl"
          aria-label="Mobile"
        >
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`min-h-[var(--touch)] rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                  active
                    ? "bg-surface text-primary shadow-sm"
                    : "text-foreground hover:bg-surface/70"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => handleNavClick("/contact")}
            className="btn-primary mt-2 w-full"
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
