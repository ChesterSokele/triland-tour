import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";
import { TourSchema } from "@/components/TourSchema";

const TITLE = "Namibia Complete Route | 10-Day Kalahari, Sossusvlei & Etosha Tour | Tri-land Tours";
const DESCRIPTION =
  "A 10-day round trip from Windhoek: the Kalahari, the Sossusvlei dunes, Walvis Bay with a catamaran cruise, and Etosha game drives. Day-by-day itinerary, request a quote or build your own.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/namibia-complete-route" },
  openGraph: { type: "website", url: "/namibia-complete-route", siteName: "Tri-land Tours", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function NamibiaCompleteRoutePage() {
  return (
    <PageShell>
      <TourSchema tour="namibia" />
      <TourPage tour="namibia" />
    </PageShell>
  );
}
