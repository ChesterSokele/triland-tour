"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { CONTACT_EMAIL, mailto } from "@/lib/site";
import { SmartImage } from "./ui/SmartImage";
import { RevealLines } from "./ui/RevealLines";
import { MagneticButton } from "./ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

type CopyState = "idle" | "copied" | "selected";

export function FinalCta() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [copy, setCopy] = useState<CopyState>("idle");
  const timer = useRef<number | undefined>(undefined);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.2, 1]);

  function settle(state: CopyState) {
    setCopy(state);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopy("idle"), 2200);
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      settle("copied");
    } catch {
      // Clipboard refused: select the address so the visitor can copy it themselves.
      const el = emailRef.current;
      const sel = window.getSelection();
      if (el && sel) {
        const range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      settle("selected");
    }
  }

  const copyLabel = copy === "copied" ? t.cta.copied : copy === "selected" ? t.cta.copyFallback : t.cta.copy;

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-night py-32 text-bone md:py-48"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ scale: imgScale }}>
        <SmartImage name="cta" sizes="100vw" imgClassName="object-[50%_70%]" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-night)_0%,rgba(16,14,12,0.55)_35%,rgba(16,14,12,0.7)_100%)]"
      />
      <div className="grain -z-10" aria-hidden="true" />

      <div className="shell">
        <RevealLines
          id="cta-title"
          lines={t.cta.lines}
          className="display text-[clamp(3rem,9.5vw,9.5rem)] uppercase"
          lineClassName={(i) => (i === 1 ? "italic normal-case text-amber md:pl-[1.2em]" : "")}
        />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-[40ch] text-[1.1rem] leading-relaxed text-bone/85 md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: EASE }}
          >
            {t.cta.body}
          </motion.p>

          <div className="md:col-span-7 md:justify-self-end">
            <p className="label mb-3 text-bone/60">{t.cta.emailLabel}</p>
            <a
              ref={emailRef}
              href={mailto(t.cta.subject)}
              className="link-line break-all font-display text-[clamp(1.6rem,3.6vw,3rem)] italic"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href={mailto(t.cta.subject)} variant="solid">
                {t.cta.start}
              </MagneticButton>
              <motion.button
                type="button"
                onClick={onCopy}
                whileTap={{ scale: 0.96 }}
                className={`flex min-h-12 cursor-pointer items-center gap-3 border px-6 py-4 text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${
                  copy === "copied" ? "border-amber text-amber" : "border-bone/40 text-bone hover:border-bone"
                }`}
              >
                <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
                  <AnimatePresence mode="wait" initial={false}>
                    {copy === "copied" ? (
                      <motion.svg key="check" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"
                        initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      >
                        <motion.path d="M2.5 8.5l3.5 3.5 7.5-8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: 0.05 }} />
                      </motion.svg>
                    ) : (
                      <motion.svg key="copy" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      >
                        <rect x="5" y="5" width="9" height="9" />
                        <path d="M2 11V2h9" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </span>
                <span aria-live="polite">{copyLabel}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
