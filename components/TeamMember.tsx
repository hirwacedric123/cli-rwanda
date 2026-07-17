"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

type TeamMemberProps = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: readonly string[];
  index?: number;
};

const TILT_SPRING = { stiffness: 280, damping: 26, mass: 0.5 };
const EXPO = [0.16, 1, 0.3, 1] as const;

export function TeamMember({ name, role, image, imageAlt, bio, index = 0 }: TeamMemberProps) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rawRotateX = useTransform(mouseY, [0, 1], [3.5, -3.5]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-3.5, 3.5]);
  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);

  /* Subtle image parallax within card */
  const imgX = useTransform(mouseX, [0, 1], [-5, 5]);
  const imgY = useTransform(mouseY, [0, 1], [-4, 4]);
  const imgXSpring = useSpring(imgX, TILT_SPRING);
  const imgYSpring = useSpring(imgY, TILT_SPRING);

  /* Cursor-following luminance highlight */
  const hlX = useTransform(mouseX, [0, 1], [0, 100]);
  const hlY = useTransform(mouseY, [0, 1], [0, 100]);
  const hlBg = useMotionTemplate`radial-gradient(circle at ${hlX}% ${hlY}%, rgba(255,255,255,0.09), transparent 65%)`;

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
      onMouseMove={reduce ? undefined : onMouseMove}
      onMouseLeave={reduce ? undefined : onMouseLeave}
    >
      <motion.article
        className="card-premium interactive-lift group flex h-full flex-col overflow-hidden rounded-[1.875rem] focus-within:ring-2 focus-within:ring-accent/30"
        style={reduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Cursor luminance highlight */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-[1.875rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: hlBg }}
            aria-hidden
          />
        )}

        <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-primary-soft sm:aspect-[5/6]">
          <motion.div
            className="absolute inset-0"
            style={reduce ? {} : { x: imgXSpring, y: imgYSpring, scale: 1.06 }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-[center_18%] transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-[1.04]"
            />
          </motion.div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-400 group-hover:opacity-90"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
            <span className="font-display text-xs font-semibold tracking-[0.16em] text-white/75">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight drop-shadow-sm transition-transform duration-350 ease-out group-hover:translate-y-[-2px]">
              {name}
            </h3>
            <p className="mt-1.5 text-sm font-medium leading-snug text-white/90 transition-transform duration-350 ease-out group-hover:translate-y-[-2px]">
              {role}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3.5 p-6 text-sm leading-relaxed text-muted sm:p-7">
          {bio.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 48)}
              className="transition-[color,opacity] duration-300 group-hover:text-foreground/80"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </motion.article>
    </div>
  );
}
