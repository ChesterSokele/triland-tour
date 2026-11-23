import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";
import { TourSchema } from "@/components/TourSchema";

const TITLE = "Namibia Golf Safari | 14-Day Golf & Game Drive Journey | Tri-land Tours";
const DESCRIPTION =
  "A 14-day Namibia golf safari: rounds in Windhoek, Walvis Bay and Tsumeb, the Sossusvlei dunes and Etosha game drives. Day-by-day itinerary, request a quote or build your own.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/golf-safari" },
  openGraph: { type: "website", url: "/golf-safari", siteName: "Tri-land Tours", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function GolfSafariPage() {
  return (
    <PageShell>
      <TourSchema tour="golf" />
      <TourPage tour="golf" />
    </PageShell>
  );
}
