"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

type ServiceCardProps = {
  title: string;
  description: string;
  href?: string;
  index?: number;
  ctaLabel?: string;
};

const indexColor = (i: number) =>
  i % 3 === 0 ? "text-earth" : i % 3 === 1 ? "text-accent" : "text-primary";

const indexGlowShadow = (i: number) =>
  i % 3 === 0
    ? "group-hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.52),0_16px_48px_rgba(28,108,54,0.18),0_4px_14px_rgba(28,108,54,0.10)]"
    : i % 3 === 1
      ? "group-hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.52),0_16px_48px_rgba(7,105,162,0.18),0_4px_14px_rgba(7,105,162,0.10)]"
      : "group-hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.52),0_16px_48px_rgba(191,94,24,0.18),0_4px_14px_rgba(191,94,24,0.10)]";

const glowColors = [
  "rgba(28,108,54,0.14)",
  "rgba(7,105,162,0.14)",
  "rgba(191,94,24,0.14)",
];

const accentLines = [
  "linear-gradient(90deg, transparent, rgba(28,108,54,0.44), transparent)",
  "linear-gradient(90deg, transparent, rgba(7,105,162,0.44), transparent)",
  "linear-gradient(90deg, transparent, rgba(191,94,24,0.44), transparent)",
];

const SPRING = { stiffness: 320, damping: 28, mass: 0.4 };

export function ServiceCard({
  title,
  description,
  href = "/services",
  index = 0,
  ctaLabel = "Learn more",
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Mouse tracking — normalized 0→1 */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  /* 3-D tilt — spring-smoothed */
  const rawRotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-5, 5]);
  const rotateX = useSpring(rawRotateX, SPRING);
  const rotateY = useSpring(rawRotateY, SPRING);

  /* Cursor-tracking radial glow position */
  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColors[index % 3]}, transparent 62%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <div
      ref={cardRef}
      className="h-full"
      style={{ perspective: "1100px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <Link
          href={href}
          className={`group card-premium relative flex h-full flex-col rounded-[1.5rem] p-6 focus-visible:ring-2 focus-visible:ring-accent/40 ${indexGlowShadow(index)}`}
        >
          {/* Dynamic cursor-following inner glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glowBg }}
            aria-hidden
          />

          <span
            className={`relative mb-4 inline-block font-display text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 ${indexColor(index)}`}
            style={{ opacity: 0.75 }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3
            className={`relative font-display text-xl font-semibold tracking-tight text-foreground transition-colors duration-250 group-hover:${indexColor(index).replace("text-", "text-")}`}
          >
            {title}
          </h3>

          <p className="prose-muted relative mt-3 flex-1 text-sm">{description}</p>

          <span
            className={`relative mt-6 inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${indexColor(index)} group-hover:gap-3`}
          >
            {ctaLabel}
            <motion.span
              aria-hidden
              className="inline-flex"
              style={{ display: "inline-block" }}
              initial={false}
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
            >
              →
            </motion.span>
          </span>

          {/* Bottom accent line */}
          <div
            className="absolute inset-x-6 bottom-0 h-px opacity-0 transition-opacity duration-350 group-hover:opacity-100"
            style={{ background: accentLines[index % 3] }}
            aria-hidden
          />
        </Link>
      </motion.div>
    </div>
  );
}
