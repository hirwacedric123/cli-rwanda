"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset to start from (px). Default 24. */
  y?: number;
  /** Horizontal offset to start from (px). Default 0. */
  x?: number;
  /** Apply blur-fade materialization effect. Default true. */
  blur?: boolean;
  /** Starting scale factor. Default 0.97. */
  scale?: number;
  /** Viewport margin before triggering. Default "-40px". */
  margin?: string;
};

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  blur = true,
  scale = 0.97,
  margin = "-40px",
}: FadeInProps) {
  const reduce = useReducedMotion();
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setCanAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (reduce || !canAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
        x,
        scale,
        filter: blur ? "blur(7px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin, amount: 0.12 }}
      transition={{
        duration: 0.7,
        delay,
        ease: EXPO_OUT,
        filter: { duration: 0.55, delay, ease: EXPO_OUT },
        scale: { duration: 0.65, delay, ease: EXPO_OUT },
      }}
    >
      {children}
    </motion.div>
  );
}
