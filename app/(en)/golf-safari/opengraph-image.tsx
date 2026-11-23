import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Namibia Golf Escape, a 14-day golf and game drive journey";

export default function Image() {
  return ogImage("Namibia Golf Escape");
}
