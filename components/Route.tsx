"use client";

import {
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ImageKey } from "@/lib/images";
import { useI18n } from "@/lib/i18n";
import { SmartImage } from "./ui/SmartImage";

const EASE = [0.16, 1, 0.3, 1] as const;
const COUNTRY_IMAGES: ImageKey[] = ["namibia", "botswana", "zimbabwe"];

/*
  Map projection: plain equirectangular, 40 px per degree.
  x = (lon − 13.5) × 40, y = (−lat − 15.5) × 40, in a 560 × 420 viewBox.
*/
const project = (lat: number, lon: number) => ({ x: (lon - 13.5) * 40, y: (-lat - 15.5) * 40 });

const STOPS = [
  { name: "Sossusvlei", ...project(-24.73, 15.29), country: 0 },
  { name: "Windhoek", ...project(-22.56, 17.08), country: 0 },
  { name: "Etosha", ...project(-19.18, 15.92), country: 0 },
  { name: "Maun", ...project(-19.98, 23.42), country: 1 },
  { name: "Kasane", ...project(-17.8, 25.15), country: 1 },
  { name: "Victoria Falls", ...project(-17.93, 25.83), country: 2 },
];

const ROUTE =
  "M71.6 369.2 Q 118 330 143.2 282.4 Q 150 210 96.8 147.2 Q 250 118 396.8 179.2 Q 442 140 466 92 L 493.2 97.2";

const LATS = [-16, -18, -20, -22, -24];
const LONS = [14, 16, 18, 20, 22, 24, 26];

// Share of the route length reached by the end of each country.
const ROUTE_AT = [0, 0.37, 0.96, 1];

export function Route() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);
  const [marker, setMarker] = useState({ x: STOPS[0].x, y: STOPS[0].y });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const drawn = useTransform(scrollYProgress, [0, 1 / 3, 2 / 3, 1], ROUTE_AT);
  const countries = t.route.countries;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(2, Math.max(0, Math.floor(p * 3))));
  });

  useMotionValueEvent(drawn, "change", (v) => {
    const path = pathRef.current;
    if (!path) return;
    const pt = path.getPointAtLength(v * path.getTotalLength());
    setMarker({ x: pt.x, y: pt.y });
  });

  // Keep the marker correct when the page loads part-way down.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const pt = path.getPointAtLength(drawn.get() * path.getTotalLength());
    setMarker({ x: pt.x, y: pt.y });
  }, [drawn]);

  function jumpTo(i: number) {
    const el = ref.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + travel * (i / 3 + 0.02), behavior: reduce ? "auto" : "smooth" });
  }

  const country = countries[active];

  return (
    <section
      id="destinations"
      ref={ref}
      aria-labelledby="route-title"
      className="relative h-[300vh] bg-night text-bone"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Landscapes */}
        {COUNTRY_IMAGES.map((img, i) => (
          <motion.div
            key={img}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, scale: i === active || reduce ? 1 : 1.08 }}
            transition={{ opacity: { duration: 1 }, scale: { duration: 1.8, ease: EASE } }}
            aria-hidden={i !== active}
          >
            <SmartImage name={img} sizes="100vw" />
          </motion.div>
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,14,12,0.9)_0%,rgba(16,14,12,0.55)_50%,rgba(16,14,12,0.35)_100%),linear-gradient(0deg,rgba(16,14,12,0.85)_0%,transparent_45%)]"
        />
        <div className="grain" aria-hidden="true" />

        <div className="shell relative flex flex-1 flex-col pb-8 pt-24 md:pb-12 md:pt-28">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="label text-amber">{t.route.eyebrow}</p>
              <h2 id="route-title" className="display mt-3 text-[clamp(1.6rem,3vw,2.6rem)] italic">
                {t.route.title}
              </h2>
            </div>
            <p className="label shrink-0 tabular-nums text-bone/70" aria-live="polite">
              <span className="text-bone">0{active + 1}</span> / 03
            </p>
          </div>

          <div className="mt-auto grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${country.name}-${active}`}
                    initial={{ y: "40%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-30%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <p className="label text-sand">
                      {country.kicker} · {country.region}
                    </p>
                    <h3 className="display mt-3 whitespace-nowrap text-[clamp(3rem,7.4vw,8rem)] uppercase">
                      {country.name}
                    </h3>
                    <p className="mt-4 max-w-[44ch] text-[1rem] leading-relaxed text-bone/80 md:text-[1.08rem]">
                      {country.body}
                    </p>
                    <dl className="mt-7 flex max-w-xl gap-8 border-t border-bone/20 pt-5">
                      {country.facts.map((f) => (
                        <div key={f.label} className="flex flex-1 flex-col">
                          <dt className="label order-2 mt-2 leading-snug text-bone/60 normal-case tracking-[0.06em]">
                            {f.label}
                          </dt>
                          <dd className="display order-1 text-[clamp(1.6rem,3vw,2.6rem)] text-amber">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <figure className="hidden lg:col-span-5 lg:block">
              <RouteMap drawn={drawn} marker={marker} active={active} label={t.route.mapLabel} />
            </figure>
          </div>

          <nav aria-label={t.route.eyebrow} className="mt-8 border-t border-bone/20 pt-4">
            <ol className="grid grid-cols-3 gap-3">
              {countries.map((c, i) => (
                <li key={c.name}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={i === active ? "step" : undefined}
                    className="group flex min-h-11 w-full cursor-pointer items-center gap-3 text-left"
                  >
                    <span className="relative hidden h-px flex-none basis-10 overflow-hidden bg-bone/25 sm:block">
                      <motion.span
                        className="absolute inset-0 origin-left bg-amber"
                        initial={false}
                        animate={{ scaleX: i <= active ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      />
                    </span>
                    <span
                      className={`label border-b pb-2 tracking-[0.1em] transition-colors duration-300 sm:border-0 sm:pb-0 sm:tracking-[0.18em] ${
                        i <= active ? "border-amber" : "border-bone/20"
                      } ${
                        i === active ? "text-bone" : "text-bone/45 group-hover:text-bone/80"
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Invisible copy of the route, used only to measure where the marker sits */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <path ref={pathRef} d={ROUTE} />
        </svg>

        {/* Compact map for small screens */}
        <div className="pointer-events-none absolute right-4 top-40 w-36 opacity-90 sm:w-48 lg:hidden" aria-hidden="true">
          <RouteMap drawn={drawn} marker={marker} active={active} compact />
        </div>
      </div>
    </section>
  );
}

type MapProps = {
  drawn: MotionValue<number>;
  marker: { x: number; y: number };
  active: number;
  label?: string;
  compact?: boolean;
};

function RouteMap({ drawn, marker, active, label, compact = false }: MapProps) {
  return (
    <svg
      viewBox="0 0 560 420"
      role={label ? "img" : undefined}
      aria-label={label}
      className="h-auto w-full overflow-visible"
    >
      {!compact && (
        <g stroke="var(--color-bone)" strokeOpacity="0.1" strokeWidth="1">
          {LATS.map((lat) => {
            const y = (-lat - 15.5) * 40;
            return (
              <g key={lat}>
                <line x1="0" x2="560" y1={y} y2={y} />
                <text x="0" y={y - 6} fill="var(--color-bone)" fillOpacity="0.4" stroke="none" fontSize="11" fontFamily="var(--font-mono)">
                  {Math.abs(lat)}°S
                </text>
              </g>
            );
          })}
          {LONS.map((lon) => {
            const x = (lon - 13.5) * 40;
            return (
              <g key={lon}>
                <line y1="0" y2="420" x1={x} x2={x} />
                <text x={x + 4} y="416" fill="var(--color-bone)" fillOpacity="0.4" stroke="none" fontSize="11" fontFamily="var(--font-mono)">
                  {lon}°E
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* Full route, faint */}
      <path d={ROUTE} fill="none" stroke="var(--color-bone)" strokeOpacity="0.22" strokeWidth={compact ? 3 : 1.5} strokeDasharray="3 7" />
      {/* Travelled route */}
      <motion.path
        d={ROUTE}
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth={compact ? 4 : 2}
        strokeLinecap="round"
        style={{ pathLength: drawn }}
      />

      {STOPS.map((s) => {
        const reached = s.country <= active;
        return (
          <g key={s.name}>
            <circle
              cx={s.x}
              cy={s.y}
              r={compact ? 7 : 4.5}
              fill={reached ? "var(--color-amber)" : "var(--color-night)"}
              stroke="var(--color-bone)"
              strokeOpacity={reached ? 0 : 0.5}
              style={{ transition: "fill 0.4s" }}
            />
            {!compact && s.name !== "Kasane" && (
              <text
                x={s.x + 10}
                y={s.name === "Victoria Falls" ? s.y - 12 : s.y + 4}
                fill="var(--color-bone)"
                fillOpacity={reached ? 0.9 : 0.45}
                fontSize="12"
                fontFamily="var(--font-mono)"
                letterSpacing="1.5"
                style={{ textTransform: "uppercase", transition: "fill-opacity 0.4s" }}
                textAnchor={s.name === "Victoria Falls" ? "end" : "start"}
              >
                {s.name}
              </text>
            )}
          </g>
        );
      })}

      <g transform={`translate(${marker.x} ${marker.y})`}>
        <circle r={compact ? 16 : 12} fill="var(--color-amber)" fillOpacity="0.25" />
        <circle r={compact ? 8 : 5.5} fill="var(--color-bone)" />
      </g>
    </svg>
  );
}
