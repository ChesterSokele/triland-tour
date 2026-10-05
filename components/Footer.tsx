"use client";

import { useI18n } from "@/lib/i18n";
import { LangSwitch } from "./ui/LangSwitch";

export function Footer() {
  const { t } = useI18n();
  const links = [
    { href: "#journeys", label: t.nav.journeys },
    { href: "#destinations", label: t.nav.destinations },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-night text-bone">
      <div className="shell border-t border-bone/15 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-[clamp(2.2rem,5vw,4rem)] uppercase leading-none tracking-[0.04em]">Triland Tour</p>
            <p className="mt-5 max-w-[36ch] text-bone/70">{t.footer.tagline}</p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-line inline-flex min-h-11 items-center text-[0.8rem] tracking-[0.14em] uppercase">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3 md:justify-self-end">
            <p className="label mb-2 text-bone/50">{t.meta.langLabel}</p>
            <LangSwitch id="footer" tone="light" />
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 pt-6">
          <p className="label text-bone/50">{t.footer.rights}</p>
          <a href="#top" className="link-line label text-bone/70">
            {t.footer.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
