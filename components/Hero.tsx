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
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="hero-background-image relative isolate overflow-hidden">
      <div className="texture-noise pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-6xl flex-col justify-center px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-14">
          <div className="max-w-3xl">
            <motion.p
              {...fade(0)}
              className="mb-5 inline-flex rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent shadow-soft backdrop-blur-xl"
            >
              Welcome to {site.name}
            </motion.p>

            <motion.h1
              {...fade(0.08)}
              className="font-display text-[2.9rem] font-semibold leading-[1.02] tracking-tight text-primary sm:text-6xl md:text-[4.6rem]"
            >
              Local ideas deserve world-class support.
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
            >
              We help Rwanda&apos;s NGOs, CBOs, women-led initiatives, and purpose-driven enterprises
              turn community vision into fundable, resilient, and measurable programs.
            </motion.p>

            <motion.div {...fade(0.24)} className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md"
              >
                Explore services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-glass-border bg-glass-bg px-6 py-3.5 text-sm font-semibold text-foreground shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                Contact us
              </Link>
            </motion.div>

            <motion.div
              {...fade(0.32)}
              className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3"
              aria-label="CLI-Rwanda focus areas"
            >
              {["Strategic counsel", "Fund development", "Capacity building"].map((item) => (
                <div key={item} className="glass-panel rounded-2xl px-4 py-3 text-sm font-semibold text-foreground">
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            {...fade(0.18)}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-primary/10 to-earth/15 blur-2xl"
              aria-hidden
            />
            <div className="glass-panel-strong relative overflow-hidden rounded-[2rem] p-7 sm:p-8">
              <div
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20"
                aria-hidden
              />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Built for local changemakers
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground">
                From proposal to partnership, with guidance at every step.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                CLI-Rwanda brings structure, strategy, and hands-on technical support to help
                mission-driven teams grow with confidence.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  ["01", "Clarify your value and development goals"],
                  ["02", "Build credible systems for donors and partners"],
                  ["03", "Scale sustainable, community-led solutions"],
                ].map(([number, text]) => (
                  <div
                    key={number}
                    className="flex gap-4 rounded-2xl border border-glass-border bg-white/38 p-4 backdrop-blur-xl dark:bg-white/[0.04]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-semibold text-primary">
                      {number}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
