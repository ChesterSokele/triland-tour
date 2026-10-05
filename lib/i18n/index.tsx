"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { en, type Dictionary } from "./en";
import { de } from "./de";

export const LANGUAGES = ["en", "de"] as const;
export type Lang = (typeof LANGUAGES)[number];

const DICTIONARIES: Record<Lang, Dictionary> = { en, de };
const STORAGE_KEY = "triland-lang";
// How long the page dims before the new language is swapped in.
const SWAP_MS = 180;

type I18nValue = {
  lang: Lang;
  t: Dictionary;
  switching: boolean;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [switching, setSwitching] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Restoring a saved preference after hydration is the intended external sync here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "en" || saved === "de") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      window.clearTimeout(timer.current);
      setSwitching(true);
      timer.current = window.setTimeout(() => {
        setLangState(next);
        setSwitching(false);
      }, SWAP_MS);
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, t: DICTIONARIES[lang], switching, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
