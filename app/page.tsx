import { Site } from "@/components/Site";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Triland Tour",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  slogan: "Two journeys. One untamed continent.",
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
          "A 10-day Namibia journey combining golf between red dunes with afternoon game drives. Minimum 3 guests.",
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
          "A 12-day wildlife safari across Namibia, Botswana and Zimbabwe for 3–6 guests.",
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
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Site />
    </>
  );
}
