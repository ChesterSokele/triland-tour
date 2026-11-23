"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { en } from "@/lib/i18n/en";
import { CONTACT_EMAIL } from "@/lib/site";
import { TOURS, type TourId } from "@/lib/tours";
import { TOUR_IMAGES, type TourImageKey } from "@/lib/tourImages";
import { MagneticButton } from "./ui/MagneticButton";
import { SmartImage } from "./ui/SmartImage";

const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));

function TourImage({ name, alt }: { name: TourImageKey; alt: string }) {
  const [failed, setFailed] = useState(false);
  const image = TOUR_IMAGES[name];
  return (
    <figure className="relative aspect-[16/10] overflow-hidden" style={{ background: image.fallback }}>
      {!failed && (
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 58vw, (min-width: 768px) 64vw, 92vw"
          quality={80}
          loading="lazy"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}

export function TourPage({ tour }: { tour: TourId }) {
  const { t, href } = useI18n();
  const def = TOURS[tour];
  const journey = t.journeys[tour];
  const days = journey.itinerary;
  const tp = t.tourPage;
  const formId = useId();

  const [selected, setSelected] = useState<boolean[]>(() => def.days.map(() => true));
  const [form, setForm] = useState({ name: "", email: "", guests: "", dates: "", notes: "" });
  const [error, setError] = useState("");

  const count = selected.filter(Boolean).length;
  const total = def.days.length;
  const isFull = count === total;
  const range = useMemo(
    () =>
      def.guests.max
        ? fill(tp.guestsRange, { min: def.guests.min, max: def.guests.max })
        : fill(tp.guestsMin, { min: def.guests.min }),
    [def.guests, tp.guestsRange, tp.guestsMin],
  );

  const isLocked = (i: number) => def.locked.includes(i + 1);
  const canCustomise = def.days.some((_, i) => !isLocked(i));
  const toggle = (i: number) => {
    if (isLocked(i)) return;
    setSelected((s) => s.map((v, j) => (j === i ? !v : v)));
  };
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setError("");
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    const guests = Number(form.guests);
    if (!form.name.trim() || !form.email.trim() || !form.guests) return setError(tp.errorRequired);
    if (!Number.isInteger(guests) || guests < def.guests.min || (def.guests.max && guests > def.guests.max)) {
      return setError(fill(tp.errorGuests, { range }));
    }

    // The email is always written in English for the Tri-land Tours team, whatever language the page is in.
    const enJourney = en.journeys[tour];
    const lines = enJourney.itinerary.map((d, i) => ({ ...d, kept: selected[i] }));
    const kept = lines.filter((d) => d.kept);
    const body = [
      `Journey: ${enJourney.title}`,
      `Guests: ${guests}`,
      `Preferred dates: ${form.dates.trim() || "Not specified"}`,
      `Itinerary: ${isFull ? `Full itinerary (${total} days)` : `Custom itinerary (${count} of ${total} days)`}`,
      "",
      ...kept.map((d) => `Day ${d.day}${d.stay ? `: ${d.stay}` : ""}`),
      ...(isFull ? [] : ["", `Removed: ${lines.filter((d) => !d.kept).map((d) => `Day ${d.day}`).join(", ")}`]),
      "",
      form.notes.trim() ? `Notes: ${form.notes.trim()}` : "",
      "",
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
    ].join("\n");

    const subject = fill(en.tourPage.mailSubject, { tour: enJourney.title });
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Large, high-contrast fields: a clear box, dark border and big text so they are easy to see and read.
  const labelCls = "block text-[1.1rem] font-semibold text-ink";
  const field =
    "mt-2 w-full rounded-sm border-2 border-ink bg-white px-4 py-3.5 text-[1.15rem] text-ink outline-none transition-shadow placeholder:text-ink-dim focus:border-dune focus:shadow-[0_0_0_4px_rgba(159,69,38,0.3)]";

  return (
    <>
      {/* Hero */}
      <section id="top" className="relative flex min-h-[82vh] items-end overflow-hidden bg-night text-bone">
        <SmartImage name={def.hero} sizes="100vw" preload />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,14,12,0.55)_0%,rgba(16,14,12,0.2)_40%,rgba(16,14,12,0.88)_100%)]" />
        <div className="shell relative pb-14 pt-40 md:pb-20">
          <Link href={href("/")} className="label link-line mb-8 inline-flex items-center gap-2 text-amber">
            <span aria-hidden="true">←</span> {tp.back}
          </Link>
          <p className="label mb-5 text-amber">
            {journey.index} · {journey.eyebrow}
          </p>
          <h1 className="display max-w-[16ch] text-[clamp(2.8rem,8vw,7rem)]">{journey.title}</h1>
          <p className="mt-7 max-w-[52ch] text-[1.1rem] leading-relaxed text-bone/85">{journey.body}</p>

          <dl className="mt-10 flex max-w-xl border-y border-bone/20">
            {journey.stats.map((s, i) => (
              <div key={s.label} className={`flex flex-1 flex-col py-5 ${i > 0 ? "border-l border-bone/20 pl-5" : "pr-5"}`}>
                <dt className="label order-2 mt-2 text-mist">{s.label}</dt>
                <dd className="display order-1 text-[clamp(2rem,3.4vw,3rem)] tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href="#itinerary" variant="solid">
              {tp.seeItinerary}
            </MagneticButton>
            <MagneticButton href="#quote" variant="outline">
              {tp.requestQuote}
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" aria-labelledby="itinerary-title" className="bg-sand text-ink">
        <div className="shell pt-24 md:pt-32">
          <p className="label text-dune">{tp.itineraryLabel}</p>
          <h2 id="itinerary-title" className="display mt-4 text-[clamp(2.2rem,5vw,4.4rem)]">
            {tp.itineraryTitle}
          </h2>
          <p className="mt-6 max-w-[60ch] text-[1.05rem] leading-relaxed text-ink-dim">{canCustomise ? tp.itineraryLead : tp.itineraryLeadFixed}</p>
          <p className="label mt-4 text-ink-dim">{tp.placeholderNote}</p>
        </div>

        <ol className="shell mt-14 md:mt-20">
          {def.days.map((image, i) => {
            const text = days[i];
            const kept = selected[i];
            return (
              <li key={text.day} className="grid gap-x-10 gap-y-6 border-t border-ink/15 py-10 md:grid-cols-12 md:py-14">
                <div className={`transition-opacity duration-500 md:col-span-4 ${kept ? "" : "opacity-45"}`}>
                  <p className="flex items-baseline gap-3 text-dune">
                    <span className="label">{tp.day}</span>
                    <span className="display text-[clamp(2.6rem,4vw,3.8rem)] tabular-nums">{text.day}</span>
                  </p>
                  <p className={`mt-4 max-w-[44ch] text-[1.05rem] leading-relaxed ${kept ? "" : "line-through decoration-ink/40"}`}>
                    {text.text}
                  </p>
                  {text.stay && (
                    <p className="mt-5 text-[0.95rem]">
                      <span className="label mr-3 text-ink-dim">{t.journeys.itinerary.stayLabel}</span>
                      {text.stay}
                      {text.board && (
                        <span className="mt-1 block text-ink-dim">
                          <span className="label mr-3">{t.journeys.itinerary.boardLabel}</span>
                          <abbr title={(t.journeys.itinerary.board as Record<string, string>)[text.board]} className="no-underline">
                            {text.board}
                          </abbr>
                        </span>
                      )}
                    </p>
                  )}
                  {canCustomise &&
                    (isLocked(i) ? (
                      <p className="label mt-6 text-ink-dim">{tp.included}</p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggle(i)}
                        aria-pressed={!kept}
                        className="label mt-6 inline-flex min-h-11 cursor-pointer items-center gap-3 border border-ink/30 px-4 py-2 transition-colors hover:border-dune hover:text-dune"
                      >
                        <span aria-hidden="true">{kept ? "−" : "+"}</span>
                        {kept ? tp.removeDay : tp.restoreDay}
                      </button>
                    ))}
                  {!kept && <p className="label mt-3 text-dune">{tp.removed}</p>}
                </div>

                <div
                  className={`transition-[opacity,filter] duration-500 md:col-span-8 ${
                    kept ? "" : "opacity-40 grayscale"
                  }`}
                >
                  <TourImage name={image} alt={text.text} />
                </div>
              </li>
            );
          })}
        </ol>

        {/* Selection bar: stays in view while you browse the days, then scrolls away with the section */}
        <div className="sticky bottom-0 z-20 border-t border-ink/15 bg-bone/95 backdrop-blur-md">
          <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
            <p className="text-[0.95rem]" aria-live="polite">
              <span className="label mr-3 text-dune">{isFull ? tp.fullItinerary : tp.customItinerary}</span>
              {canCustomise && fill(tp.selection, { n: count, total })}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {!isFull && (
                <button
                  type="button"
                  onClick={() => setSelected(def.days.map(() => true))}
                  className="label link-line min-h-11 cursor-pointer text-ink-dim"
                >
                  {tp.restoreAll}
                </button>
              )}
              <a
                href="#quote"
                className={`label inline-flex min-h-11 items-center bg-night px-6 text-bone transition-colors hover:bg-dune ${
                  count === 0 ? "pointer-events-none opacity-40" : ""
                }`}
                aria-disabled={count === 0}
              >
                {tp.getQuote} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="bg-sand py-24 text-ink md:py-32">
        <div className="shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-dune">{t.faq.label}</p>
            <h2 id="faq-title" className="display mt-4 text-[clamp(2.2rem,5vw,4.4rem)]">
              {t.faq.title}
            </h2>
          </div>
          <div className="md:col-span-7">
            {t.faq.tours[tour].map((f) => (
              <details key={f.q} className="group border-t border-ink/15 py-5 last:border-b">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[1.15rem] font-medium">
                  {f.q}
                  <span aria-hidden="true" className="text-dune transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-[60ch] text-[1.05rem] leading-relaxed text-ink-dim">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section id="quote" aria-labelledby="quote-title" className="bg-bone py-24 text-ink md:py-36">
        <div className="shell grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-dune">{tp.quoteLabel}</p>
            <h2 id="quote-title" className="display mt-4 text-[clamp(2.2rem,5vw,4.4rem)]">
              {tp.quoteTitle}
            </h2>
            <p className="mt-6 max-w-[44ch] text-[1.05rem] leading-relaxed text-ink-dim">{tp.quoteLead}</p>

            <div className="mt-10 border-y border-ink/15 py-6">
              <p className="label text-ink-dim">{tp.yourItinerary}</p>
              <p className="display mt-3 text-[clamp(1.6rem,2.4vw,2.2rem)]">
                {journey.title}
              </p>
              <p className="mt-2 text-ink-dim">
                {isFull ? tp.fullItinerary : tp.customItinerary}
                {canCustomise && <> · {fill(tp.selection, { n: count, total })}</>}
              </p>
              <a href="#itinerary" className="label link-line mt-4 inline-block text-dune">
                {tp.itineraryTitle} ↑
              </a>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="md:col-span-6 md:col-start-7">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <label className="block sm:col-span-1" htmlFor={`${formId}-name`}>
                <span className={labelCls}>{tp.fields.name}</span>
                <input id={`${formId}-name`} name="name" autoComplete="name" required value={form.name} onChange={set("name")} className={field} />
              </label>
              <label className="block sm:col-span-1" htmlFor={`${formId}-email`}>
                <span className={labelCls}>{tp.fields.email}</span>
                <input id={`${formId}-email`} name="email" type="email" autoComplete="email" required value={form.email} onChange={set("email")} className={field} />
              </label>
              <label className="block" htmlFor={`${formId}-guests`}>
                <span className={labelCls}>{tp.fields.guests}</span>
                <input
                  id={`${formId}-guests`}
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  min={def.guests.min}
                  max={def.guests.max}
                  required
                  value={form.guests}
                  onChange={set("guests")}
                  aria-describedby={`${formId}-guests-hint`}
                  className={field}
                />
                <span id={`${formId}-guests-hint`} className="mt-2 block text-[1rem] text-ink-dim">
                  {range}
                </span>
              </label>
              <label className="block" htmlFor={`${formId}-dates`}>
                <span className={labelCls}>{tp.fields.dates}</span>
                <input id={`${formId}-dates`} name="dates" placeholder={tp.fields.datesHint} value={form.dates} onChange={set("dates")} className={field} />
              </label>
              <label className="block sm:col-span-2" htmlFor={`${formId}-notes`}>
                <span className={labelCls}>{tp.fields.notes}</span>
                <textarea id={`${formId}-notes`} name="notes" rows={4} value={form.notes} onChange={set("notes")} className={`${field} resize-y`} />
              </label>
            </div>

            {error && (
              <p role="alert" className="mt-6 border-l-4 border-dune bg-dune/10 px-4 py-3 text-[1.05rem] font-medium text-ink">
                {error}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                type="submit"
                disabled={count === 0}
                className="inline-flex min-h-14 cursor-pointer items-center gap-4 bg-night px-9 py-4 text-[1.05rem] font-semibold uppercase tracking-[0.1em] text-bone transition-colors hover:bg-dune disabled:cursor-not-allowed disabled:opacity-40"
              >
                {tp.submit} <span aria-hidden="true">→</span>
              </button>
              <p className="max-w-[34ch] text-[1rem] text-ink-dim">{tp.submitNote}</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
