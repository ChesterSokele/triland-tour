import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";
import { TourSchema } from "@/components/TourSchema";

const TITLE = "3-Country Big Five Safari | Namibia, Botswana & Zimbabwe | Tri-land Tours";
const DESCRIPTION =
  "An 11-day safari through Namibia, Botswana and Zimbabwe: Etosha, the Kavango, Chobe and Victoria Falls. Day-by-day itinerary, request a quote or build your own.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/three-country-safari" },
  openGraph: { type: "website", url: "/three-country-safari", siteName: "Tri-land Tours", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function ThreeCountrySafariPage() {
  return (
    <PageShell>
      <TourSchema tour="safari" />
      <TourPage tour="safari" />
    </PageShell>
  );
}
