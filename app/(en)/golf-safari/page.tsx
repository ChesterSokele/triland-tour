import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";
import { TourSchema } from "@/components/TourSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("en", "golf");

export default function Page() {
  return (
    <PageShell lang="en">
      <TourSchema tour="golf" lang="en" />
      <TourPage tour="golf" />
    </PageShell>
  );
}
