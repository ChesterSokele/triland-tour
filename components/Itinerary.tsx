"use client";

import { useId, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/en";

type Day = Dictionary["journeys"]["golf"]["itinerary"][number];

type Props = {
  days: Day[];
  tone: "light" | "dark";
};

/** Collapsible day-by-day list. The content stays in the DOM when closed so it remains indexable. */
export function Itinerary({ days, tone }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const dark = tone === "dark";
  const dim = dark ? "text-mist" : "text-ink-dim";
  const rule = dark ? "border-bone/15" : "border-ink/15";
  const accent = dark ? "text-amber" : "text-dune";
  const board = t.journeys.itinerary.board as Record<string, string>;

  return (
    <div className={`md:col-span-12 border-t ${rule}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`label flex w-full items-center justify-between gap-6 py-6 text-left ${accent}`}
      >
        <span>
          {open ? t.journeys.itinerary.hide : t.journeys.itinerary.show} · {days.length}
        </span>
        <span
          aria-hidden="true"
          className={`relative h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "rotate-45" : ""
          }`}
        >
          <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-current" />
          <span className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-current" />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" inert={!open}>
          <ol className={`border-t ${rule}`}>
            {days.map((d) => (
              <li
                key={d.day}
                className={`grid gap-x-8 gap-y-3 border-b py-7 md:grid-cols-12 md:py-8 ${rule}`}
              >
                <div className="flex items-baseline gap-3 md:col-span-2">
                  <span className={`label ${dim}`}>{t.journeys.itinerary.day}</span>
                  <span className={`display text-[clamp(2rem,3vw,2.8rem)] tabular-nums ${accent}`}>{d.day}</span>
                </div>
                <p className={`max-w-[60ch] text-[1.02rem] leading-relaxed md:col-span-6 ${dark ? "text-bone" : "text-ink"}`}>
                  {d.text}
                </p>
                {d.stay && (
                  <dl className="md:col-span-4">
                    <div className="flex flex-wrap gap-x-3">
                      <dt className={`label ${dim}`}>{t.journeys.itinerary.stayLabel}</dt>
                      <dd>{d.stay}</dd>
                    </div>
                    {d.board && (
                      <div className="mt-1 flex flex-wrap gap-x-3">
                        <dt className={`label ${dim}`}>{t.journeys.itinerary.boardLabel}</dt>
                        <dd className={dim}>
                          <abbr title={board[d.board]} className="no-underline">
                            {d.board}
                          </abbr>
                          {board[d.board] ? ` · ${board[d.board]}` : ""}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
