import { en } from "@/lib/i18n/en";
import { SITE_URL } from "@/lib/site";
import { TOURS, type TourId } from "@/lib/tours";

const COUNTRIES: Record<TourId, string[]> = {
  golf: ["Namibia"],
  safari: ["Namibia", "Botswana", "Zimbabwe"],
  namibia: ["Namibia"],
};

/** TouristTrip + BreadcrumbList + FAQPage JSON-LD for one tour page, built from the English copy. */
export function TourSchema({ tour }: { tour: TourId }) {
  const def = TOURS[tour];
  const journey = en.journeys[tour];
  const url = `${SITE_URL}${def.path}`;
  const days = Number(journey.stats.find((s) => s.label === "Days")?.value);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${url}#trip`,
        name: journey.title,
        description: journey.body,
        url,
        inLanguage: ["en", "de"],
        touristType: journey.tags,
        provider: { "@type": "TravelAgency", name: "Tri-land Tours", url: SITE_URL },
        offers: {
          "@type": "Offer",
          url: `${url}#quote`,
          availability: "https://schema.org/InStock",
          priceSpecification: { "@type": "PriceSpecification", description: "Price on request; request a quote" },
        },
        itinerary: {
          "@type": "ItemList",
          numberOfItems: journey.itinerary.length,
          itemListElement: journey.itinerary.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Day ${d.day}`,
            description: d.text,
          })),
        },
        subjectOf: { "@type": "Place", name: COUNTRIES[tour].join(", ") },
        ...(Number.isFinite(days) ? { duration: `P${days}D` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Tri-land Tours", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: journey.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: en.faq.tours[tour].map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
