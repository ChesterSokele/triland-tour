import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";
import { TourSchema } from "@/components/TourSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("de", "golf");

export default function Page() {
  return (
    <PageShell lang="de">
      <TourSchema tour="golf" lang="de" />
      <TourPage tour="golf" />
    </PageShell>
  );
}
