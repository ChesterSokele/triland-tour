import type { Metadata } from "next";
import { localePath, type Lang } from "./locale";
import { TOURS, type TourId } from "./tours";

type Key = "home" | TourId;

const COPY: Record<Lang, Record<Key, { title: string; description: string }>> = {
  en: {
    home: {
      title: "Tri-land Tours | Golf & Safari Journeys Across Southern Africa",
      description: "Discover handcrafted golf and safari journeys across Namibia, Botswana and Zimbabwe with Tri-land Tours.",
    },
    golf: {
      title: "Namibia Golf Safari | 14-Day Golf & Game Drive Journey | Tri-land Tours",
      description:
        "A 14-day Namibia golf safari: rounds in Windhoek, Walvis Bay and Tsumeb, the Sossusvlei dunes and Etosha game drives. Day-by-day itinerary, request a quote or build your own.",
    },
    safari: {
      title: "3-Country Big Five Safari | Namibia, Botswana & Zimbabwe | Tri-land Tours",
      description:
        "An 11-day safari through Namibia, Botswana and Zimbabwe: Etosha, the Kavango, Chobe and Victoria Falls. Day-by-day itinerary, request a quote or build your own.",
    },
    namibia: {
      title: "Namibia Complete Route | 10-Day Kalahari, Sossusvlei & Etosha Tour | Tri-land Tours",
      description:
        "A 10-day round trip from Windhoek: the Kalahari, the Sossusvlei dunes, Walvis Bay with a catamaran cruise, and Etosha game drives. Day-by-day itinerary, request a quote or build your own.",
    },
  },
  de: {
    home: {
      title: "Tri-land Tours | Golf- & Safarireisen im südlichen Afrika",
      description: "Entdecken Sie handverlesene Golf- und Safarireisen durch Namibia, Botswana und Simbabwe mit Tri-land Tours.",
    },
    golf: {
      title: "Namibia Golf-Safari | 14 Tage Golf & Pirschfahrten | Tri-land Tours",
      description:
        "Eine 14-tägige Golf-Safari in Namibia: Runden in Windhoek, Walvis Bay und Tsumeb, die Dünen von Sossusvlei und Pirschfahrten im Etosha. Reiseverlauf Tag für Tag, Angebot anfragen oder Reise individuell zusammenstellen.",
    },
    safari: {
      title: "Big-Five-Safari durch 3 Länder | Namibia, Botswana & Simbabwe | Tri-land Tours",
      description:
        "Eine 11-tägige Safari durch Namibia, Botswana und Simbabwe: Etosha, Kavango, Chobe und die Victoriafälle. Reiseverlauf Tag für Tag, Angebot anfragen oder Reise individuell zusammenstellen.",
    },
    namibia: {
      title: "Namibia-Rundreise | 10 Tage Kalahari, Sossusvlei & Etosha | Tri-land Tours",
      description:
        "Eine 10-tägige Rundreise ab Windhoek: die Kalahari, die Dünen von Sossusvlei, Walvis Bay mit Katamaranfahrt und Pirschfahrten im Etosha. Reiseverlauf Tag für Tag, Angebot anfragen oder Reise individuell zusammenstellen.",
    },
  },
};

export const pagePath = (key: Key) => (key === "home" ? "/" : TOURS[key].path);

/** Title, description, canonical, hreflang alternates and social tags for one page in one language. */
export function pageMetadata(lang: Lang, key: Key): Metadata {
  const { title, description } = COPY[lang][key];
  const path = pagePath(key);
  const url = localePath(lang, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: path, de: localePath("de", path), "x-default": path },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Tri-land Tours",
      title,
      description,
      locale: lang === "de" ? "de_DE" : "en_GB",
      alternateLocale: lang === "de" ? ["en_GB"] : ["de_DE"],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
