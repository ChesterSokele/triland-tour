"use client";

import { motion } from "motion/react";

const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

type Props = {
  lines: string[];
  id?: string;
  as?: keyof typeof TAGS;
  className?: string;
  lineClassName?: (index: number) => string;
  /** "load" plays immediately; "view" plays when scrolled into view. */
  trigger?: "load" | "view";
  delay?: number;
  stagger?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Headline that rises in line by line from behind a mask.
 * The heading itself watches the viewport: the masked lines are clipped to
 * nothing before they animate, so they can't observe visibility on their own.
 */
export function RevealLines({
  lines,
  id,
  as = "h2",
  className = "",
  lineClassName,
  trigger = "view",
  delay = 0,
  stagger = 0.12,
}: Props) {
  const Tag = TAGS[as];
  const play =
    trigger === "load"
      ? { animate: "shown" }
      : { whileInView: "shown", viewport: { once: true, amount: 0.4 } };

  return (
    <Tag id={id} className={className} initial="hidden" {...play}>
      {lines.map((line, i) => (
        <span key={`${i}-${line}`} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block will-change-transform ${lineClassName?.(i) ?? ""}`}
            variants={{
              hidden: { y: "108%" },
              shown: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
