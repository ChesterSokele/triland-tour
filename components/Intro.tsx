"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { RevealLines } from "./ui/RevealLines";
import { SmartImage } from "./ui/SmartImage";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Intro() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The statement settles to full size as it arrives, like a title card coming into focus.
  const scale = useTransform(scrollYProgress, [0, 0.45], [reduce ? 1 : 0.92, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", reduce ? "-8%" : "8%"]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-bone py-28 md:py-44">
      <div className="shell">
        <p className="label mb-12 flex items-center gap-4 text-dune md:mb-20">
          <span className="h-px w-10 bg-dune" aria-hidden="true" />
          {t.intro.label}
        </p>

        <motion.div style={{ scale }} className="origin-left">
          <RevealLines
            lines={t.intro.lines}
            className="display text-[clamp(2.7rem,9vw,9.5rem)] text-ink"
            lineClassName={(i) => (i === 0 ? "" : "italic text-dune")}
          />
        </motion.div>

        <div className="mt-20 grid gap-14 md:mt-32 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 md:col-start-2">
            <motion.p
              className="max-w-[34ch] text-[1.2rem] leading-relaxed text-ink md:text-[1.35rem]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease: EASE }}
            >
              {t.intro.lead}
            </motion.p>
            <div className="mt-12 space-y-5 border-t border-ink/15 pt-8">
              {[t.intro.fairways, t.intro.wildlife].map((line, i) => (
                <motion.p
                  key={i}
                  className="flex items-baseline gap-5 font-display text-[1.5rem] italic text-ink-dim md:text-[1.8rem]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.15 }}
                >
                  <span className="label not-italic text-dune">0{i + 1}</span>
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.figure
            className="md:col-span-4 md:col-start-8"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="relative aspect-[4/5] overflow-hidden"
              variants={{
                hidden: { clipPath: "inset(100% 0 0 0)" },
                shown: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.4, ease: EASE } },
              }}
            >
              <motion.div className="absolute inset-[-10%_0]" style={{ y: imgY }}>
                <SmartImage name="intro" sizes="(min-width: 768px) 33vw, 100vw" />
              </motion.div>
            </motion.div>
            <figcaption className="label mt-4 text-ink-dim">{t.intro.caption}</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
