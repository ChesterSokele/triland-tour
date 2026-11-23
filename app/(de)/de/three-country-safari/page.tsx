import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";
import { TourSchema } from "@/components/TourSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("de", "safari");

export default function Page() {
  return (
    <PageShell lang="de">
      <TourSchema tour="safari" lang="de" />
      <TourPage tour="safari" />
    </PageShell>
  );
}
