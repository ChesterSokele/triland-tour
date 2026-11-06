"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ui/ScrollProgress";
import { Cursor } from "./ui/Cursor";

function Frame({ children }: { children: ReactNode }) {
  const { t, switching } = useI18n();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[80] bg-amber px-4 py-3 text-night focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.meta.skip}
      </a>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <motion.main id="main" animate={{ opacity: switching ? 0.25 : 1 }} transition={{ duration: 0.18 }}>
        {children}
      </motion.main>
      <Footer />
    </>
  );
}

/** Shared chrome (language, nav, footer) for the inner pages. The home page builds its own in Site.tsx. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <Frame>{children}</Frame>
      </I18nProvider>
    </MotionConfig>
  );
}
