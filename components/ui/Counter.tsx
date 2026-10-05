"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  value: number;
  pad?: number;
  suffix?: string;
  className?: string;
};

const format = (n: number, pad: number) => String(Math.round(n)).padStart(pad, "0");

/**
 * Counts up from zero the first time it scrolls into view.
 * Server markup holds the final number, so it reads correctly without JS.
 */
export function Counter({ value, pad = 2, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const primed = useRef(false);

  // Before it is seen, reset to zero so the count-up has somewhere to start.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || primed.current) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      el.textContent = format(0, pad) + suffix;
      primed.current = true;
    }
  }, [pad, suffix, reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || !primed.current) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v, pad) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, pad, suffix]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(value, pad) + suffix}
    </span>
  );
}
