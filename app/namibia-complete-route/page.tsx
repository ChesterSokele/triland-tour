import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";

export const metadata: Metadata = {
  title: "Namibia Complete Route | 10-Day Kalahari, Sossusvlei & Etosha Tour | Tri-land Tours",
  description:
    "A 10-day round trip from Windhoek: the Kalahari, the Sossusvlei dunes, Walvis Bay with a catamaran cruise, and Etosha game drives. Day-by-day itinerary, request a quote or build your own.",
  alternates: { canonical: "/namibia-complete-route" },
};

export default function NamibiaCompleteRoutePage() {
  return (
    <PageShell>
      <TourPage tour="namibia" />
    </PageShell>
  );
}
