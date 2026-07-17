"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setCanAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Keep content visible during SSR/hydration; only fade in after mount.
  const fade = (delay = 0) =>
    reduce || !canAnimate
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="hero-background-image relative isolate overflow-hidden">
      <div className="texture-noise pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent sm:h-40"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[calc(100svh-var(--header-offset))] w-[var(--container-wide)] flex-col justify-center py-12 sm:py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-16">
          <div className="max-w-3xl">
            <motion.p
              {...fade(0)}
              className="mb-5 inline-flex min-h-9 items-center rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent shadow-soft backdrop-blur-xl"
            >
              Welcome to {site.name}
            </motion.p>

            <motion.h1
              {...fade(0.08)}
              className="display-title text-[clamp(2.35rem,6.5vw,4.5rem)] text-primary"
            >
              Local ideas deserve world-class support.
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              className="prose-muted mt-6 max-w-2xl text-base sm:mt-7 sm:text-lg md:text-xl"
            >
              We help Rwanda&apos;s NGOs, CBOs, women-led initiatives, and purpose-driven enterprises
              turn community vision into fundable, resilient, and measurable programs.
            </motion.p>

            <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <Link href="/services" className="btn-primary">
                Explore services
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact us
              </Link>
            </motion.div>

            <motion.ul
              {...fade(0.32)}
              className="mt-8 grid max-w-2xl gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-3"
              aria-label="CLI-Rwanda focus areas"
            >
              {[
                ["Strategic counsel", "brand-chip-green"],
                ["Fund development", "brand-chip-blue"],
                ["Capacity building", "brand-chip-orange"],
              ].map(([item, chip]) => (
                <li
                  key={item}
                  className={`${chip} rounded-2xl px-4 py-3 text-sm font-semibold shadow-soft backdrop-blur-xl`}
                >
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            {...fade(0.18)}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-primary/10 to-earth/15 blur-2xl"
              aria-hidden
            />
            <div className="glass-panel-strong relative overflow-hidden rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8">
              <div
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20"
                aria-hidden
              />
              <p className="eyebrow">Built for local changemakers</p>
              <h2 className="display-title mt-4 text-[clamp(1.5rem,3vw,1.875rem)] text-foreground">
                From proposal to partnership, with guidance at every step.
              </h2>
              <p className="prose-muted mt-4 text-sm sm:mt-5">
                CLI-Rwanda brings structure, strategy, and hands-on technical support to help
                mission-driven teams grow with confidence.
              </p>

              <ol className="mt-7 space-y-3 sm:mt-8 sm:space-y-4">
                {[
                  ["01", "Clarify your value and development goals", "bg-earth-soft text-earth"],
                  ["02", "Build credible systems for donors and partners", "bg-accent-soft text-accent"],
                  ["03", "Scale sustainable, community-led solutions", "bg-primary-soft text-primary"],
                ].map(([number, text, tone]) => (
                  <li
                    key={number}
                    className="flex gap-3.5 rounded-2xl border border-glass-border bg-white/38 p-3.5 backdrop-blur-xl dark:bg-white/[0.04] sm:gap-4 sm:p-4"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${tone}`}
                    >
                      {number}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-foreground">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
