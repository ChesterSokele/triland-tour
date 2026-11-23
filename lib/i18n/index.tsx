"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useTransition, type ReactNode } from "react";
import { en, type Dictionary } from "./en";
import { de } from "./de";

import { localePath, type Lang } from "../locale";

export type { Lang };
export const LANGUAGES = ["en", "de"] as const;

const DICTIONARIES: Record<Lang, Dictionary> = { en, de };

type I18nValue = {
  lang: Lang;
  t: Dictionary;
  /** True while the page is moving to the other language's URL. */
  switching: boolean;
  setLang: (lang: Lang) => void;
  /** Prefixes an internal path with the current language (e.g. "/golf-safari" -> "/de/golf-safari"). */
  href: (path: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

/** The language is decided by the URL (/ is English, /de is German), so each language is indexable. */
export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [switching, startTransition] = useTransition();

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      const base = pathname.replace(/^\/de(?=\/|$)/, "") || "/";
      const target = localePath(next, base);
      startTransition(() => router.push(target + window.location.hash, { scroll: false }));
    },
    [lang, pathname, router],
  );

  const value = useMemo<I18nValue>(
    () => ({ lang, t: DICTIONARIES[lang], switching, setLang, href: (p) => localePath(lang, p) }),
    [lang, switching, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
