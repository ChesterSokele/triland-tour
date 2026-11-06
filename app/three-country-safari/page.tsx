import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";

export const metadata: Metadata = {
  title: "3-Country Big Five Safari | Namibia, Botswana & Zimbabwe | Triland Tour",
  description:
    "An 11-day safari through Namibia, Botswana and Zimbabwe: Etosha, the Kavango, Chobe and Victoria Falls. Day-by-day itinerary, request a quote or build your own.",
  alternates: { canonical: "/three-country-safari" },
};

export default function ThreeCountrySafariPage() {
  return (
    <PageShell>
      <TourPage tour="safari" />
    </PageShell>
  );
}
