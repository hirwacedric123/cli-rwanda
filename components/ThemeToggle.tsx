"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SPRING_BACK = [0.34, 1.56, 0.64, 1] as const;
const EASE_IN = [0.4, 0, 1, 1] as const;

const iconEnter = {
  initial: { opacity: 0, rotate: -70, scale: 0.6, filter: "blur(3px)" },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.36, ease: SPRING_BACK },
  },
};

const iconExit = {
  exit: {
    opacity: 0,
    rotate: 70,
    scale: 0.6,
    filter: "blur(3px)",
    transition: { duration: 0.2, ease: EASE_IN },
  },
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle color theme"
        className="icon-btn-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground backdrop-blur-xl"
        disabled
      >
        <span className="h-5 w-5" aria-hidden />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="icon-btn-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground backdrop-blur-xl"
      whileHover={{ y: -2, scale: 1.06 }}
      whileTap={{ y: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          className="flex"
          {...iconEnter}
          {...iconExit}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 3v1.5M12 19.5V21M4.5 12H3M21 12h-1.5M6.05 6.05l1.06 1.06M16.89 16.89l1.06 1.06M6.05 17.95l1.06-1.06M16.89 7.11l1.06-1.06"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 14.5A7.5 7.5 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
