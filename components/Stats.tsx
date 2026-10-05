"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Counter } from "./ui/Counter";

const EASE = [0.16, 1, 0.3, 1] as const;

// Figures are fixed; only their labels are translated.
const FIGURES = [
  { value: 3, suffix: "" },
  { value: 12, suffix: "" },
  { value: 5, suffix: "+" },
  { value: 1, suffix: "" },
];

export function Stats() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="stats-title" className="bg-night py-24 text-bone md:py-36">
      <div className="shell">
        <h2 id="stats-title" className="label mb-14 text-amber md:mb-20">
          {t.stats.label}
        </h2>
        <dl className="grid grid-cols-2 border-t border-bone/15 lg:grid-cols-4">
          {FIGURES.map((f, i) => (
            <motion.div
              key={i}
              className={`flex flex-col border-b border-bone/15 py-8 md:py-12 ${
                i % 2 === 1 ? "border-l pl-5 md:pl-8" : "pr-5"
              } ${i === 2 ? "lg:border-l lg:pl-8" : ""} ${i > 0 ? "lg:pl-8" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
            >
              <dt className="label order-2 mt-4 text-mist">{t.stats.items[i]}</dt>
              <dd className="display order-1 text-[clamp(4.5rem,11vw,10rem)] leading-[0.85]">
                <Counter value={f.value} suffix={f.suffix} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
