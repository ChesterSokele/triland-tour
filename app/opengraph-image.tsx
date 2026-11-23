import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Tri-land Tours: golf and safari journeys across Southern Africa";

export default function Image() {
  return ogImage("Three journeys. One untamed continent.");
}
