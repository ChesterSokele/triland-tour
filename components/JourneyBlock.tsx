"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ImageKey } from "@/lib/images";
import { mailto } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/en";
import { SmartImage } from "./ui/SmartImage";
import { MagneticButton } from "./ui/MagneticButton";
import { RevealLines } from "./ui/RevealLines";

type Journey = Dictionary["journeys"]["golf"];

type Props = {
  journey: Journey;
  number: string;
  image: ImageKey;
  /** Which side the photograph sits on (desktop). */
  side: "left" | "right";
  tone: "light" | "dark";
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function JourneyBlock({ journey, number, image, side, tone }: Props) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 80, reduce ? 0 : -80]);

  const dark = tone === "dark";
  const dim = dark ? "text-mist" : "text-ink-dim";
  const rule = dark ? "border-bone/15" : "border-ink/15";
  const accent = dark ? "text-amber" : "text-dune";
  const fromLeft = side === "left";

  return (
    <article ref={ref} className="shell relative grid gap-12 py-20 md:grid-cols-12 md:gap-8 md:py-32">
      <motion.div
        className={`group relative md:col-span-7 ${fromLeft ? "md:order-1" : "md:order-2 md:col-start-6"}`}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* The trigger sits on this unclipped wrapper; a fully clipped element never reports as visible. */}
        <motion.div
          className="relative aspect-[4/3] overflow-hidden md:aspect-[5/6]"
          variants={{
            hidden: { clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
            shown: { clipPath: "inset(0 0% 0 0%)", transition: { duration: 1.5, ease: EASE } },
          }}
        >
          <motion.div
            className="absolute inset-0"
            variants={{ hidden: { scale: 1.2 }, shown: { scale: 1, transition: { duration: 2, ease: EASE } } }}
          >
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
              <SmartImage name={image} sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
          </motion.div>
        </motion.div>
        <motion.span
          aria-hidden="true"
          style={{ y: numY }}
          className={`display pointer-events-none absolute -bottom-10 text-[clamp(6rem,16vw,15rem)] leading-none ${
            fromLeft ? "-right-4 md:-right-16" : "-left-4 md:-left-16"
          } ${dark ? "text-amber/90" : "text-dune/90"}`}
        >
          {number}
        </motion.span>
      </motion.div>

      <div
        className={`flex flex-col justify-center md:col-span-5 ${
          fromLeft ? "md:order-2 md:col-start-9 md:col-end-13 md:pl-6" : "md:order-1 md:col-span-4 md:col-start-1"
        }`}
      >
        <p className={`label mb-6 flex items-center gap-3 ${accent}`}>
          <span>{journey.index}</span>
          <span className={`h-px w-8 ${dark ? "bg-amber/60" : "bg-dune/60"}`} aria-hidden="true" />
          <span>{journey.eyebrow}</span>
        </p>

        <RevealLines lines={[journey.title]} as="h3" className="display text-[clamp(2.4rem,4.6vw,4.4rem)]" />

        <motion.p
          className={`mt-7 max-w-[42ch] text-[1.05rem] leading-relaxed ${dim}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          {journey.body}
        </motion.p>

        <dl className={`mt-10 flex border-y ${rule}`}>
          {journey.stats.map((s, i) => (
            <div key={s.label} className={`flex flex-1 flex-col py-5 ${i > 0 ? `border-l pl-5 ${rule}` : "pr-5"}`}>
              <dt className={`label order-2 mt-2 ${dim}`}>{s.label}</dt>
              <dd className="display order-1 text-[clamp(2.2rem,3.6vw,3.2rem)] tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className={`label mt-7 flex flex-wrap gap-x-4 gap-y-2 ${dim}`}>
          {journey.tags.map((tag, i) => (
            <li key={tag} className="flex items-center gap-4">
              {i > 0 && <span aria-hidden="true" className={`h-1 w-1 rounded-full ${dark ? "bg-amber" : "bg-dune"}`} />}
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <MagneticButton href={mailto(journey.subject)} variant={dark ? "solid" : "dark"}>
            {t.journeys.enquire}
          </MagneticButton>
        </div>
      </div>
    </article>
  );
}
