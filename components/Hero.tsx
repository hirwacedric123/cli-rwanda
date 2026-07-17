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

  const fade = (delay = 0) =>
    reduce || !canAnimate
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="hero-background-image relative isolate overflow-hidden">
      {/* Ambient orb glows */}
      <div
        className="pointer-events-none absolute -top-40 left-[10%] h-[36rem] w-[36rem] rounded-full bg-accent/[0.07] blur-[96px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-20 right-[8%] h-[28rem] w-[28rem] rounded-full bg-earth/[0.06] blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-20 left-[42%] h-[22rem] w-[22rem] rounded-full bg-primary/[0.07] blur-[72px]"
        aria-hidden
      />

      <div className="texture-noise pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      {/* Bottom fade to background */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent sm:h-52"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-var(--header-offset))] w-[var(--container-wide)] flex-col justify-center py-12 sm:py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">

          {/* ── Left column — copy ── */}
          <div className="max-w-3xl">
            {/* Eyebrow badge — premium pill */}
            <motion.div {...fade(0)} className="mb-6 inline-flex">
              <span
                className="gold-chip inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-xl"
                style={{
                  background:
                    "linear-gradient(var(--gold-soft), var(--gold-soft)) padding-box, linear-gradient(130deg, rgba(201,168,92,0.55) 0%, rgba(201,168,92,0.15) 50%, rgba(201,168,92,0.45) 100%) border-box",
                  border: "1px solid transparent",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.75), 0 1px 6px rgba(155,123,56,0.14)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-gold"
                  style={{
                    boxShadow: "0 0 5px rgba(155,123,56,0.7)",
                  }}
                />
                Welcome to {site.name}
              </span>
            </motion.div>

            <motion.h1
              {...fade(0.08)}
              className="display-title text-[clamp(2.5rem,6.5vw,4.65rem)] text-foreground"
            >
              Local ideas deserve{" "}
              <span className="text-primary">world-class</span>{" "}
              support.
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              className="prose-muted mt-6 max-w-2xl text-base sm:mt-7 sm:text-lg md:text-xl"
            >
              We help Rwanda&apos;s NGOs, CBOs, women-led initiatives, and purpose-driven
              enterprises turn community vision into fundable, resilient, and measurable programs.
            </motion.p>

            <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <Link href="/services" className="btn-primary">
                Explore services
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact us
              </Link>
            </motion.div>

            {/* Focus area chips */}
            <motion.ul
              {...fade(0.32)}
              className="mt-8 grid max-w-2xl gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-2.5"
              aria-label="CLI-Rwanda focus areas"
            >
              {[
                ["Strategic counsel", "brand-chip-green"],
                ["Fund development", "brand-chip-blue"],
                ["Capacity building", "brand-chip-orange"],
              ].map(([item, chip]) => (
                <li
                  key={item}
                  className={`${chip} rounded-2xl px-4 py-3 text-sm font-semibold backdrop-blur-xl`}
                >
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ── Right column — card ── */}
          <motion.div {...fade(0.18)} className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Outer glow halo */}
            <div
              className="absolute -inset-8 rounded-[2.75rem] opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 30%, rgba(7,105,162,0.18), transparent 55%), radial-gradient(ellipse at 70% 75%, rgba(191,94,24,0.14), transparent 50%)",
              }}
              aria-hidden
            />

            {/* Hero card with premium gradient border */}
            <div
              className="relative overflow-hidden rounded-[1.875rem] p-6 sm:rounded-[2.125rem] sm:p-8"
              style={{
                background:
                  "linear-gradient(var(--glass-strong), var(--glass-strong)) padding-box, linear-gradient(145deg, rgba(255,255,255,0.44) 0%, rgba(255,255,255,0.09) 38%, rgba(255,255,255,0.03) 62%, rgba(255,255,255,0.20) 100%) border-box",
                border: "1px solid transparent",
                boxShadow:
                  "inset 0 1.5px 0 rgba(255,255,255,0.80), var(--shadow-xl)",
                backdropFilter: "blur(30px) saturate(160%)",
                WebkitBackdropFilter: "blur(30px) saturate(160%)",
              }}
            >
              {/* Top prismatic shine */}
              <div
                className="pointer-events-none absolute inset-x-12 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.90), rgba(201,168,92,0.55), rgba(255,255,255,0.90), transparent)",
                }}
                aria-hidden
              />

              <p className="eyebrow">Built for local changemakers</p>
              <h2 className="display-title mt-4 text-[clamp(1.5rem,2.8vw,1.875rem)] text-foreground">
                From proposal to partnership, with guidance at every step.
              </h2>
              <p className="prose-muted mt-4 text-sm sm:mt-5">
                CLI-Rwanda brings structure, strategy, and hands-on technical support to help
                mission-driven teams grow with confidence.
              </p>

              {/* Step list */}
              <ol className="mt-7 space-y-2.5 sm:mt-8">
                {[
                  {
                    number: "01",
                    text: "Clarify your value and development goals",
                    numBg: "bg-earth-soft",
                    numColor: "text-earth",
                  },
                  {
                    number: "02",
                    text: "Build credible systems for donors and partners",
                    numBg: "bg-accent-soft",
                    numColor: "text-accent",
                  },
                  {
                    number: "03",
                    text: "Scale sustainable, community-led solutions",
                    numBg: "bg-primary-soft",
                    numColor: "text-primary",
                  },
                ].map(({ number, text, numBg, numColor }) => (
                  <li
                    key={number}
                    className="flex gap-3.5 rounded-2xl p-3.5 sm:gap-4 sm:p-4"
                    style={{
                      background:
                        "linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)) padding-box, linear-gradient(145deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.14) 100%) border-box",
                      border: "1px solid transparent",
                    }}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${numBg} ${numColor}`}
                      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.70)" }}
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
