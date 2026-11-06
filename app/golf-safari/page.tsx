import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";

export const metadata: Metadata = {
  title: "Namibia Golf Safari | 14-Day Golf & Game Drive Journey | Triland Tour",
  description:
    "A 14-day Namibia golf safari: rounds in Windhoek, Walvis Bay and Tsumeb, the Sossusvlei dunes and Etosha game drives. Day-by-day itinerary, request a quote or build your own.",
  alternates: { canonical: "/golf-safari" },
};

export default function GolfSafariPage() {
  return (
    <PageShell>
      <TourPage tour="golf" />
    </PageShell>
  );
}
