"use client";

import { motion } from "motion/react";
import { LANGUAGES, useI18n } from "@/lib/i18n";

type Props = {
  /** Unique per instance so each switch animates its own pill. */
  id: string;
  tone?: "light" | "dark";
};

export function LangSwitch({ id, tone = "light" }: Props) {
  const { lang, setLang, t } = useI18n();
  const ink = tone === "light" ? "text-bone" : "text-ink";
  const pill = tone === "light" ? "bg-bone" : "bg-ink";
  const activeInk = tone === "light" ? "text-night" : "text-bone";

  return (
    <div role="group" aria-label={t.meta.langLabel} className={`flex items-center gap-1 ${ink}`}>
      {LANGUAGES.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            lang={code}
            className={`relative flex h-11 min-w-11 cursor-pointer items-center justify-center px-2 font-mono text-[0.72rem] tracking-[0.18em] uppercase transition-colors duration-300 ${active ? activeInk : "opacity-70 hover:opacity-100"}`}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className={`absolute inset-x-0.5 inset-y-2 rounded-full ${pill}`}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative">{code}</span>
          </button>
        );
      })}
    </div>
  );
}
