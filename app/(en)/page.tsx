import type { Metadata } from "next";
import { HomeSchema } from "@/components/HomeSchema";
import { Site } from "@/components/Site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("en", "home");

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Site lang="en" />
    </>
  );
}
