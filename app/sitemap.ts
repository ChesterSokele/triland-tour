import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TOURS } from "@/lib/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...Object.values(TOURS).map((t) => ({
      url: `${SITE_URL}${t.path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
