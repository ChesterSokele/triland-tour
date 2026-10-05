"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { SmartImage } from "./ui/SmartImage";
import { RevealLines } from "./ui/RevealLines";

const EASE = [0.16, 1, 0.3, 1] as const;

// Where each overlay label sits on the photograph.
const LABEL_POSITIONS = ["left-5 top-6 md:left-8 md:top-10", "right-5 top-1/2 md:right-8", "bottom-6 left-5 md:bottom-10 md:left-8"];

export function GolfFeature() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);
  const headX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <section ref={ref} aria-labelledby="golf-feature-title" className="relative overflow-hidden py-24 md:py-40">
      <div className="shell grid items-center gap-14 md:grid-cols-12 md:gap-8">
        <div className="relative z-10 md:col-span-6 md:col-start-1 md:row-start-1">
          <p className="label mb-8 text-dune">{t.golfFeature.eyebrow}</p>
          <motion.div style={{ x: headX }}>
            <RevealLines
              id="golf-feature-title"
              lines={t.golfFeature.lines}
              className="display text-[clamp(2.8rem,7.4vw,7.6rem)] text-ink"
              lineClassName={(i) => (i === 1 ? "italic text-dune md:pl-[1.4em]" : "")}
            />
          </motion.div>
          <motion.p
            className="mt-10 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink-dim md:ml-[4.5rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: EASE }}
          >
            {t.golfFeature.body}
          </motion.p>
        </div>

        <motion.figure
          className="relative md:col-span-5 md:col-start-8 md:row-start-1"
          initial={{ clipPath: "inset(12% 12% 12% 12%)", opacity: 0.4 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.div className="absolute inset-[-14%_0]" style={{ y: imgY }}>
              <SmartImage name="golfFeature" sizes="(min-width: 768px) 42vw, 100vw" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-night/20" aria-hidden="true" />
            {t.golfFeature.labels.map((label, i) => (
              <motion.span
                key={label}
                className={`label absolute flex items-center gap-3 text-bone ${LABEL_POSITIONS[i]}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.8 + i * 0.15 }}
              >
                <span className="h-px w-6 bg-amber" aria-hidden="true" />
                {label}
              </motion.span>
            ))}
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
