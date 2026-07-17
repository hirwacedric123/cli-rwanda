"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

/* ── Shared easing ── */
const EXPO = [0.16, 1, 0.3, 1] as const;
const SPRING_SOFT = { stiffness: 80, damping: 22, mass: 0.8 };

/* ── Word-level stagger variants ── */
const headingContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EXPO },
  },
};

/* ── Chip stagger variants ── */
const chipContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.34 },
  },
};

const chipVariant = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: EXPO },
  },
};

/* ── Step stagger variants ── */
const stepContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.22 },
  },
};

const stepVariant = {
  hidden: { opacity: 0, x: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EXPO },
  },
};

/* ── Generic fade helper ── */
const fade = (delay = 0, reduce: boolean | null = false, canAnimate = true) =>
  reduce || !canAnimate
    ? {}
    : {
        initial: { opacity: 0, y: 20, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.65, delay, ease: EXPO },
      };

export function Hero() {
  const reduce = useReducedMotion();
  const [canAnimate, setCanAnimate] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setCanAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ── Scroll-driven parallax ── */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawContentY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const rawContentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const rawOrb1Y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const rawOrb2Y = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const rawOrb3Y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const contentY = useSpring(rawContentY, SPRING_SOFT);
  const contentOpacity = useSpring(rawContentOpacity, SPRING_SOFT);
  const orb1Y = useSpring(rawOrb1Y, SPRING_SOFT);
  const orb2Y = useSpring(rawOrb2Y, SPRING_SOFT);
  const orb3Y = useSpring(rawOrb3Y, SPRING_SOFT);

  const animate = canAnimate && !reduce;

  return (
    <section ref={heroRef} className="hero-background-image relative isolate overflow-hidden">

      {/* ── Ambient orb glows — floating + parallax ── */}
      <motion.div
        className="pointer-events-none absolute -top-40 left-[10%] h-[36rem] w-[36rem] rounded-full bg-accent/[0.07] blur-[96px] animate-float-a animate-breathe"
        style={{ y: orb1Y }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -top-20 right-[8%] h-[28rem] w-[28rem] rounded-full bg-earth/[0.06] blur-[80px] animate-float-b animate-breathe"
        style={{ y: orb2Y, animationDelay: "-4s" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-20 left-[42%] h-[22rem] w-[22rem] rounded-full bg-primary/[0.07] blur-[72px] animate-float-c"
        style={{ y: orb3Y }}
        aria-hidden
      />

      <div className="texture-noise pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      {/* Bottom fade to background */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent sm:h-52"
        aria-hidden
      />

      {/* ── Content layer with scroll opacity/parallax ── */}
      <motion.div
        className="relative mx-auto flex min-h-[calc(100svh-var(--header-offset))] w-[var(--container-wide)] flex-col justify-center py-12 sm:py-16 md:py-24"
        style={animate ? { y: contentY, opacity: contentOpacity } : undefined}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">

          {/* ── Left column — copy ── */}
          <div className="max-w-3xl">

            {/* Eyebrow badge */}
            <motion.div {...fade(0, reduce, canAnimate)} className="mb-6 inline-flex">
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
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot"
                  style={{ boxShadow: "0 0 5px rgba(155,123,56,0.7)" }}
                />
                Welcome to {site.name}
              </span>
            </motion.div>

            {/* H1 — word-by-word stagger */}
            {animate ? (
              <motion.h1
                variants={headingContainer}
                initial="hidden"
                animate="visible"
                className="display-title text-[clamp(2.5rem,6.5vw,4.65rem)] text-foreground"
                style={{ display: "block" }}
              >
                {["Local", "ideas", "deserve"].map((w) => (
                  <span key={w} style={{ display: "inline-block" }}>
                    <motion.span variants={wordVariant} style={{ display: "inline-block" }}>
                      {w}
                    </motion.span>
                    {" "}
                  </span>
                ))}
                <motion.span
                  variants={wordVariant}
                  style={{ display: "inline-block" }}
                  className="text-primary"
                >
                  world-class
                </motion.span>
                {" "}
                <motion.span variants={wordVariant} style={{ display: "inline-block" }}>
                  support.
                </motion.span>
              </motion.h1>
            ) : (
              <h1 className="display-title text-[clamp(2.5rem,6.5vw,4.65rem)] text-foreground">
                Local ideas deserve{" "}
                <span className="text-primary">world-class</span>{" "}
                support.
              </h1>
            )}

            <motion.p
              {...fade(0.2, reduce, canAnimate)}
              className="prose-muted mt-6 max-w-2xl text-base sm:mt-7 sm:text-lg md:text-xl"
            >
              We help Rwanda&apos;s NGOs, CBOs, women-led initiatives, and purpose-driven
              enterprises turn community vision into fundable, resilient, and measurable programs.
            </motion.p>

            <motion.div
              {...fade(0.28, reduce, canAnimate)}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
            >
              <Link href="/services" className="btn-primary">
                Explore services
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact us
              </Link>
            </motion.div>

            {/* Focus area chips — staggered */}
            {animate ? (
              <motion.ul
                variants={chipContainer}
                initial="hidden"
                animate="visible"
                className="mt-8 grid max-w-2xl gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-2.5"
                aria-label="CLI-Rwanda focus areas"
              >
                {[
                  ["Strategic counsel", "brand-chip-green"],
                  ["Fund development", "brand-chip-blue"],
                  ["Capacity building", "brand-chip-orange"],
                ].map(([item, chip]) => (
                  <motion.li
                    key={item}
                    variants={chipVariant}
                    className={`${chip} rounded-2xl px-4 py-3 text-sm font-semibold backdrop-blur-xl`}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <ul
                className="mt-8 grid max-w-2xl gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-2.5"
                aria-label="CLI-Rwanda focus areas"
              >
                {[
                  ["Strategic counsel", "brand-chip-green"],
                  ["Fund development", "brand-chip-blue"],
                  ["Capacity building", "brand-chip-orange"],
                ].map(([item, chip]) => (
                  <li key={item} className={`${chip} rounded-2xl px-4 py-3 text-sm font-semibold backdrop-blur-xl`}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ── Right column — card ── */}
          <motion.div
            {...fade(0.2, reduce, canAnimate)}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            whileHover={animate ? { y: -5, transition: { duration: 0.4, ease: EXPO } } : undefined}
          >
            {/* Outer glow halo */}
            <div
              className="absolute -inset-8 rounded-[2.75rem] opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 30%, rgba(7,105,162,0.18), transparent 55%), radial-gradient(ellipse at 70% 75%, rgba(191,94,24,0.14), transparent 50%)",
              }}
              aria-hidden
            />

            {/* Hero card */}
            <div
              className="hero-card-glass relative overflow-hidden rounded-[1.875rem] p-6 sm:rounded-[2.125rem] sm:p-8"
            >
              {/* Top prismatic shine */}
              <div
                className="card-shine-top pointer-events-none absolute inset-x-12 top-0 h-px"
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

              {/* Step list — staggered */}
              {animate ? (
                <motion.ol
                  variants={stepContainer}
                  initial="hidden"
                  animate="visible"
                  className="mt-7 space-y-2.5 sm:mt-8"
                >
                  {[
                    { number: "01", text: "Clarify your value and development goals", numBg: "bg-earth-soft", numColor: "text-earth" },
                    { number: "02", text: "Build credible systems for donors and partners", numBg: "bg-accent-soft", numColor: "text-accent" },
                    { number: "03", text: "Scale sustainable, community-led solutions", numBg: "bg-primary-soft", numColor: "text-primary" },
                  ].map(({ number, text, numBg, numColor }) => (
                    <motion.li
                      key={number}
                      variants={stepVariant}
                      className="hero-step-item flex gap-3.5 rounded-2xl p-3.5 sm:gap-4 sm:p-4"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${numBg} ${numColor}`}
                        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.70)" }}
                      >
                        {number}
                      </span>
                      <p className="text-sm font-medium leading-relaxed text-foreground">{text}</p>
                    </motion.li>
                  ))}
                </motion.ol>
              ) : (
                <ol className="mt-7 space-y-2.5 sm:mt-8">
                  {[
                    { number: "01", text: "Clarify your value and development goals", numBg: "bg-earth-soft", numColor: "text-earth" },
                    { number: "02", text: "Build credible systems for donors and partners", numBg: "bg-accent-soft", numColor: "text-accent" },
                    { number: "03", text: "Scale sustainable, community-led solutions", numBg: "bg-primary-soft", numColor: "text-primary" },
                  ].map(({ number, text, numBg, numColor }) => (
                  <li
                    key={number}
                    className="hero-step-item flex gap-3.5 rounded-2xl p-3.5 sm:gap-4 sm:p-4"
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
              )}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
