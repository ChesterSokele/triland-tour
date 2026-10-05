"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "dark";
  className?: string;
};

const VARIANTS = {
  solid: "bg-amber text-night",
  outline: "border border-bone/50 text-bone",
  dark: "bg-night text-bone",
};

const FILL = {
  solid: "bg-bone",
  outline: "bg-bone",
  dark: "bg-dune",
};

const FILL_TEXT = {
  solid: "group-hover:text-night",
  outline: "group-hover:text-night",
  dark: "group-hover:text-bone",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/** Link-button that leans toward the pointer, with a fill that sweeps up and an arrow that travels. */
export function MagneticButton({ href, children, variant = "solid", className = "" }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex min-h-12 items-center gap-4 overflow-hidden px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.16em] ${VARIANTS[variant]} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${FILL[variant]}`}
      />
      <span className={`relative transition-colors duration-300 ${FILL_TEXT[variant]}`}>{children}</span>
      <span className={`relative flex w-5 overflow-hidden transition-colors duration-300 ${FILL_TEXT[variant]}`}>
        <Arrow className="h-5 w-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />
        <Arrow className="-ml-5 h-5 w-5 shrink-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
      </span>
    </motion.a>
  );
}
