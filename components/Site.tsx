"use client";

import { MotionConfig, motion } from "motion/react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { Journeys } from "./Journeys";
import { Route } from "./Route";
import { Stats } from "./Stats";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ui/ScrollProgress";
import { Cursor } from "./ui/Cursor";

function Page() {
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
      {/* The page dims briefly while the language swaps, so the change reads as one transition. */}
      <motion.main id="main" animate={{ opacity: switching ? 0.25 : 1 }} transition={{ duration: 0.18 }}>
        <Hero />
        <Intro />
        <Journeys />
        <Route />
        <Stats />
        <FinalCta />
      </motion.main>
      <Footer />
    </>
  );
}

export function Site() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <Page />
      </I18nProvider>
    </MotionConfig>
  );
}
