import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootHtml } from "@/components/RootHtml";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

export const viewport: Viewport = { themeColor: "#100e0c" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
