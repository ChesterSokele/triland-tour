"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type PointerEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { SmartImage } from "./ui/SmartImage";
import { RevealLines } from "./ui/RevealLines";

const EASE = [0.16, 1, 0.3, 1] as const;

// A trail of paired prints wandering across the section, drawn as you scroll.
const TRACK_PATH = "M -20 520 C 160 470 260 560 420 500 S 700 380 860 420 S 1120 520 1260 360 S 1420 220 1480 180";

export function SafariFeature() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const trail = useTransform(scrollYProgress, [0.15, 0.7], reduce ? [1, 1] : [0, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.15, 1]);

  // Torchlight: a soft circle of light follows the pointer, like a spotlight on a night drive.
  const mx = useMotionValue(50);
  const my = useMotionValue(45);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const mask = useMotionTemplate`radial-gradient(circle at ${sx}% ${sy}%, rgba(16,14,12,0) 0px, rgba(16,14,12,0.35) 180px, rgba(16,14,12,0.86) 420px)`;

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section ref={ref} aria-labelledby="safari-feature-title" className="relative overflow-hidden pb-24 pt-10 md:pb-40">
      <div className="shell">
        <div
          className="relative isolate aspect-[4/5] overflow-hidden sm:aspect-[16/10] md:aspect-[16/8]"
          onPointerMove={onMove}
          data-cursor
        >
          <motion.div className="absolute inset-0 -z-10" style={{ scale: imgScale }}>
            <SmartImage name="safariFeature" sizes="(min-width: 1440px) 1300px, 92vw" imgClassName="object-[50%_55%]" />
          </motion.div>
          <motion.div aria-hidden="true" className="absolute inset-0" style={{ background: mask }} />

          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
            <div className="flex items-start justify-between gap-6">
              <p className="label text-amber">{t.safariFeature.eyebrow}</p>
              <p className="label hidden max-w-[22ch] text-right text-bone/60 md:block">{t.safariFeature.hint}</p>
            </div>
            <RevealLines
              id="safari-feature-title"
              lines={[t.safariFeature.title]}
              className="display text-[clamp(3rem,9.5vw,9.5rem)] italic text-bone"
            />
          </div>
        </div>

        <div className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <motion.p
            className="max-w-[46ch] text-[1.1rem] leading-relaxed text-bone/80 md:col-span-6 md:col-start-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: EASE }}
          >
            {t.safariFeature.body}
          </motion.p>

          <ul className="md:col-span-4 md:col-start-9">
            {t.safariFeature.bigFive.map((animal, i) => (
              <motion.li
                key={animal}
                className="flex items-baseline justify-between border-b border-bone/12 py-3"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              >
                <span className="font-display text-[1.6rem] italic">{animal}</span>
                <span className="label text-mist">0{i + 1} / 05</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 640"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full"
      >
        <motion.path
          d={TRACK_PATH}
          fill="none"
          stroke="var(--color-amber)"
          strokeOpacity="0.45"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 22"
          style={{ pathLength: trail }}
        />
      </svg>
    </section>
  );
}
