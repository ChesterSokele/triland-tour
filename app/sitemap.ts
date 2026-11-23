import type { MetadataRoute } from "next";
import { localePath } from "@/lib/locale";
import { pagePath } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { TOURS } from "@/lib/tours";

/** Every page in both languages, each entry cross-linking its translation (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [{ path: pagePath("home"), priority: 1 }, ...Object.values(TOURS).map((t) => ({ path: t.path, priority: 0.8 }))];
  return pages.flatMap(({ path, priority }) => {
    const en = `${SITE_URL}${path === "/" ? "" : path}`;
    const de = `${SITE_URL}${localePath("de", path)}`;
    const alternates = { languages: { en, de, "x-default": en } };
    return [
      { url: en, changeFrequency: "monthly" as const, priority, alternates },
      { url: de, changeFrequency: "monthly" as const, priority, alternates },
    ];
  });
}
