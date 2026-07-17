"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

const EXPO = [0.16, 1, 0.3, 1] as const;

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
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    return () => { document.body.style.overflow = ""; };
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

    if (itemHash) return pathname === base && hash === itemHash;
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
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[linear-gradient(to_bottom,var(--header-bg)_0%,var(--header-bg)_60%,transparent_100%)]"
          : "bg-transparent"
      }`}
    >
      <div className="px-3 py-3 sm:px-4 sm:py-4">
        {/* Main header bar */}
        <div
          className="header-bar site-container-wide flex h-[var(--header-height)] items-center justify-between gap-3 rounded-[1.45rem] px-3 backdrop-blur-2xl sm:gap-4 sm:rounded-[1.7rem] sm:px-5"
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex min-h-[var(--touch)] items-center gap-2.5 rounded-full pr-1 transition-transform duration-300 hover:-translate-y-0.5 sm:gap-3.5"
            aria-label={`${site.fullName} home`}
            onClick={() => setOpen(false)}
          >
            <span
              className="logo-plate-glass flex h-12 w-[4.5rem] overflow-hidden rounded-xl sm:h-14 sm:w-[5.25rem] sm:rounded-[1.1rem]"
            >
              <Image
                src="/cli.png"
                alt=""
                width={84}
                height={56}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="hidden min-[400px]:flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold tracking-tight text-primary sm:text-xl">
                Consilium
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-[0.72rem]">
                CLI-Rwanda
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="nav-pill hidden items-center gap-0.5 rounded-full p-1 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`rounded-full px-4 py-2 text-[0.8375rem] font-semibold tracking-[0.005em] transition-all duration-200 xl:px-5 xl:text-sm ${
                    active
                      ? "bg-background text-primary nav-item-active-shadow"
                      : "text-muted hover:bg-white/30 dark:hover:bg-white/8 hover:text-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-primary hidden sm:inline-flex !min-h-0 !py-2 !px-4 !text-sm"
            >
              Get in touch
            </Link>
            {/* Hamburger — animated morph */}
            <motion.button
              ref={toggleRef}
              type="button"
              className="icon-btn-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  className="flex"
                  initial={{ opacity: 0, rotate: open ? -60 : 60, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: open ? 60 : -60, scale: 0.7 }}
                  transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {open ? <CloseIcon /> : <MenuIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[3px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-hidden
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            ref={panelRef}
            className="absolute inset-x-3 top-[calc(var(--header-height)+1.5rem)] z-50 origin-top sm:inset-x-4 lg:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.97, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, scale: 0.97, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: EXPO }}
          >
            <nav
              className="mobile-menu-glass site-container-wide flex flex-col gap-1 rounded-[1.45rem] p-3"
              aria-label="Mobile"
            >
              {nav.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12, filter: "blur(3px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.32, ease: EXPO }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`block min-h-[var(--touch)] rounded-2xl px-4 py-3 text-base font-semibold tracking-[0.005em] transition-all duration-200 ${
                        active
                          ? "bg-background text-primary mobile-item-active-shadow"
                          : "text-foreground hover:bg-white/20 dark:hover:bg-white/8"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -12, filter: "blur(3px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.04 + nav.length * 0.05, duration: 0.32, ease: EXPO }}
              >
                <Link
                  href="/contact"
                  onClick={() => handleNavClick("/contact")}
                  className="btn-primary mt-2 w-full"
                >
                  Get in touch
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
