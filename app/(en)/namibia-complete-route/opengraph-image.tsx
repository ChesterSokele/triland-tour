import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Namibia Complete Route, a 10-day round trip from Windhoek";

export default function Image() {
  return ogImage("Namibia Complete Route");
}
