import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  knowsLanguage: ["en", "de"],
  name: "Tri-land Tours",
  alternateName: ["Triland Tours", "Triland Safaris", "Tri-land Safaris", "Triland Tour"],
  url: SITE_URL,
  email: CONTACT_EMAIL,
  slogan: "Three journeys. One untamed continent.",
  description:
    "Handcrafted golf and safari journeys across Namibia, Botswana and Zimbabwe.",
  areaServed: ["Namibia", "Botswana", "Zimbabwe"],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "TouristTrip",
        name: "Namibia Golf Escape",
        description:
          "A 14-day Namibia journey combining golf between red dunes with afternoon game drives. Minimum 3 guests.",
        touristType: ["Golfers", "Luxury travellers"],
        itinerary: { "@type": "Country", name: "Namibia" },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "TouristTrip",
        name: "In Search of the Big Five",
        description:
          "An 11-day wildlife safari across Namibia, Botswana and Zimbabwe for 3–6 guests.",
        touristType: ["Safari travellers", "Wildlife enthusiasts"],
        itinerary: {
          "@type": "ItemList",
          itemListElement: [
            { "@type": "ListItem", position: 1, item: { "@type": "Country", name: "Namibia" } },
            { "@type": "ListItem", position: 2, item: { "@type": "Country", name: "Botswana" } },
            { "@type": "ListItem", position: 3, item: { "@type": "Country", name: "Zimbabwe" } },
          ],
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "TouristTrip",
        name: "Namibia Complete Route",
        description:
          "A 10-day round trip from Windhoek through the Kalahari, Sossusvlei, Walvis Bay and Etosha National Park.",
        touristType: ["Safari travellers", "Landscape lovers"],
        itinerary: { "@type": "Country", name: "Namibia" },
      },
    },
  ],
};

export function HomeSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\u003c") }}
    />
  );
}
