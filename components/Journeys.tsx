"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { JourneyBlock } from "./JourneyBlock";
import { GolfFeature } from "./GolfFeature";
import { SafariFeature } from "./SafariFeature";

/** The band between the two chapters: the sun sinks below the horizon as you scroll, and day turns to night. */
function Dusk() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sunY = useTransform(scrollYProgress, [0.1, 0.75], reduce ? [60, 60] : [-40, 150]);
  const glow = useTransform(scrollYProgress, [0.2, 0.8], [0.9, 0.2]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-[46vh] min-h-[280px] overflow-hidden bg-[linear-gradient(180deg,var(--color-sand)_0%,#c98d57_30%,#6b3a22_58%,var(--color-charcoal)_100%)]"
    >
      <div className="absolute inset-x-0 top-[62%] h-px bg-bone/25" />
      <motion.div
        style={{ y: sunY, opacity: glow }}
        className="absolute left-1/2 top-[40%] h-28 w-28 -translate-x-1/2 rounded-full bg-amber shadow-[0_0_120px_40px_rgba(217,143,62,0.45)] md:h-40 md:w-40"
      />
      {/* The ground in front of the sun hides it as it sets */}
      <div className="absolute inset-x-0 bottom-0 top-[62%] bg-[linear-gradient(180deg,#4a2a1a_0%,var(--color-charcoal)_70%)]" />
    </div>
  );
}

export function Journeys() {
  const { t } = useI18n();

  return (
    <section id="journeys" aria-labelledby="journeys-title">
      <div className="bg-sand text-ink">
        <div className="shell flex items-end justify-between border-b border-ink/15 pb-6 pt-24 md:pt-36">
          <h2 id="journeys-title" className="label text-dune">
            {t.journeys.label}
          </h2>
          <span className="label text-ink-dim">02</span>
        </div>
        <JourneyBlock journey={t.journeys.golf} number="01" image="golfJourney" side="left" tone="light" />
        <GolfFeature />
      </div>

      <Dusk />

      <div className="bg-charcoal text-bone">
        <JourneyBlock journey={t.journeys.safari} number="02" image="safariJourney" side="right" tone="dark" />
        <SafariFeature />
      </div>
    </section>
  );
}
