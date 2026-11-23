import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { TourPage } from "@/components/TourPage";
import { TourSchema } from "@/components/TourSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("en", "safari");

export default function Page() {
  return (
    <PageShell lang="en">
      <TourSchema tour="safari" lang="en" />
      <TourPage tour="safari" />
    </PageShell>
  );
}
