import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "In Search of the Big Five, an 11-day safari through Namibia, Botswana and Zimbabwe";

export default function Image() {
  return ogImage("In Search of the Big Five");
}
