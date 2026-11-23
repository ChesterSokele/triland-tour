import type { ReactNode } from "react";
import { fontClassName } from "@/lib/fonts";
import type { Lang } from "@/lib/locale";
import "../app/globals.css";

/** The <html> shell shared by the English and German root layouts; `lang` is set on the server so crawlers see it. */
export function RootHtml({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} data-scroll-behavior="smooth" className={fontClassName}>
      <body>{children}</body>
    </html>
  );
}
