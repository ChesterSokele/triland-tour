"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { LangSwitch } from "./ui/LangSwitch";

const LINKS = [
  { href: "#journeys", key: "journeys" },
  { href: "#destinations", key: "destinations" },
  { href: "#about", key: "about" },
  { href: "#contact", key: "contact" },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const heroEnd = window.innerHeight * 0.75;
    setSolid(y > heroEnd);
    // Tuck the bar away while travelling down the page, bring it back on any upward scroll.
    setHidden(y > heroEnd && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tone = solid && !open ? "dark" : "light";

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden && !open ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: hidden ? 0 : 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500 ${
          solid && !open
            ? "border-b border-ink/10 bg-bone/90 text-ink backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-bone"
        }`}
      >
        <nav className="shell flex h-18 items-center justify-between gap-6 md:h-20" aria-label="Main">
          <a href="#top" aria-label={t.nav.home} className="font-display text-[1.05rem] tracking-[0.28em] uppercase">
            Triland<span className="mx-2 inline-block h-1 w-1 -translate-y-1 rounded-full bg-amber align-middle" />Tour
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <li key={l.key}>
                <a href={l.href} className="link-line text-[0.8rem] font-medium tracking-[0.14em] uppercase">
                  {t.nav[l.key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {!open && <LangSwitch id="nav" tone={tone} />}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-7">
                <motion.span
                  className="absolute left-0 top-0 h-px w-full bg-current"
                  animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-full bg-current"
                  animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-night text-bone lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="shell flex flex-1 flex-col justify-center gap-2 pt-20">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block py-2 text-[clamp(2.6rem,11vw,4.5rem)]"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.07 }}
                >
                  <span className="label mr-4 align-middle text-amber">0{i + 1}</span>
                  {t.nav[l.key]}
                </motion.a>
              ))}
            </div>
            <div className="shell flex items-center justify-between border-t border-bone/15 py-6">
              <span className="label text-mist">{t.meta.langLabel}</span>
              <LangSwitch id="menu" tone="light" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
