"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { SmartImage } from "./ui/SmartImage";
import { RevealLines } from "./ui/RevealLines";
import { MagneticButton } from "./ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer drift: the photo leans a few pixels away from the cursor for depth.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const dx = useSpring(px, { stiffness: 40, damping: 20 });
  const dy = useSpring(py, { stiffness: 40, damping: 20 });
  function onMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    px.set((e.clientX / window.innerWidth - 0.5) * -18);
    py.set((e.clientY / window.innerHeight - 0.5) * -12);
  }

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-bone"
    >
      <motion.div className="absolute inset-[-3%] -z-10" style={{ y: bgY }}>
        <motion.div className="absolute inset-0" style={{ x: dx, y: dy }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3.2, ease: EASE }}
          >
            <SmartImage name="hero" sizes="100vw" preload imgClassName="object-[50%_60%]" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(16,14,12,0.55)_0%,rgba(16,14,12,0.1)_35%,rgba(16,14,12,0.35)_60%,rgba(16,14,12,0.88)_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
      />
      <div className="grain -z-10" aria-hidden="true" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell relative flex flex-1 flex-col justify-end pb-28 pt-28 md:pb-28"
      >
        <motion.p
          className="label mb-6 text-sand md:mb-8"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <RevealLines
          as="h1"
          trigger="load"
          delay={0.8}
          stagger={0.14}
          lines={t.hero.lines}
          className="display text-[clamp(3rem,min(11vw,14.5vh),10.5rem)] uppercase"
          lineClassName={(i) => (i === 1 ? "italic normal-case text-sand pl-[0.6em] md:pl-[1.2em]" : "")}
        />

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-[46ch] text-[1.02rem] leading-relaxed text-bone/85 md:col-span-5 md:text-[1.1rem]"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.35 }}
          >
            {t.hero.body}
          </motion.p>

          <div className="flex flex-wrap gap-3 md:col-span-7 md:justify-end">
            {[
              { href: "#journeys", label: t.hero.primary, variant: "solid" as const },
              { href: "#contact", label: t.hero.secondary, variant: "outline" as const },
            ].map((b, i) => (
              <motion.div
                key={b.href}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 90, damping: 18, delay: 1.6 + i * 0.12 }}
              >
                <MagneticButton href={b.href} variant={b.variant}>
                  {b.label}
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="shell absolute inset-x-0 bottom-0 flex items-end justify-between pb-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.1 }}
      >
        <a href="#about" className="group flex items-center gap-3 text-bone/80 hover:text-bone">
          <span className="relative h-10 w-px overflow-hidden bg-bone/25">
            <motion.span
              className="absolute left-0 top-0 h-3 w-px bg-amber"
              animate={reduce ? undefined : { y: [-12, 40] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
            />
          </span>
          <span className="label">{t.hero.scroll}</span>
        </a>
        <p className="label hidden text-right text-bone/70 sm:block">
          {t.hero.location}
          <span className="mt-1 block text-bone/45">24.7593° S · 15.2944° E</span>
        </p>
      </motion.div>
    </section>
  );
}
