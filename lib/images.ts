/**
 * Image registry — every photo on the site is defined here.
 *
 * These are temporary Unsplash placeholders. To swap in final photography:
 *   1. Put the file in /public/images (e.g. /public/images/hero.jpg).
 *   2. Change `src` below to "/images/hero.jpg".
 *   3. Update the matching alt text in lib/i18n/en.ts and de.ts (images.*).
 *
 * `fallback` is a gradient painted behind each image, so every slot still
 * reads as a deliberate colour field if a photo is missing or fails to load.
 */

const UNSPLASH_QUERY = "?auto=format&fit=crop&w=2400&q=80";
const unsplash = (id: string) => `https://images.unsplash.com/${id}${UNSPLASH_QUERY}`;

export type ImageKey =
  | "hero"
  | "intro"
  | "golfJourney"
  | "golfFeature"
  | "safariJourney"
  | "safariFeature"
  | "namibia"
  | "botswana"
  | "zimbabwe"
  | "cta";

export const IMAGES: Record<ImageKey, { src: string; fallback: string }> = {
  // Deadvlei, Sossusvlei — camel thorn trees against the red dunes
  hero: {
    src: unsplash("photo-1696104613970-fc7f58d1ff39"),
    fallback: "linear-gradient(180deg,#3b5a7a 0%,#b4532c 45%,#e7d3b0 100%)",
  },
  // Footprints across a dune crest
  intro: {
    src: unsplash("photo-1706276902620-fc6fa70aedb4"),
    fallback: "linear-gradient(160deg,#e9c48f 0%,#b86a35 100%)",
  },
  // Fairway at golden hour
  golfJourney: {
    src: unsplash("photo-1709525617656-5498eefc7d03"),
    fallback: "linear-gradient(180deg,#e7b872 0%,#5f6a3a 70%,#2d3320 100%)",
  },
  // Flag on the green at dusk
  golfFeature: {
    src: unsplash("photo-1638961500056-155a2c53e328"),
    fallback: "linear-gradient(180deg,#8f8aa0 0%,#c79a86 40%,#3c4a2c 100%)",
  },
  // Open safari vehicle with a lion in the grass
  safariJourney: {
    src: unsplash("photo-1709402606682-400133d92ab2"),
    fallback: "linear-gradient(180deg,#9c8a62 0%,#3a3222 100%)",
  },
  // Leopard crossing open ground
  safariFeature: {
    src: unsplash("photo-1566708627877-859df13ae63e"),
    fallback: "radial-gradient(circle at 50% 60%,#6b5237 0%,#161310 70%)",
  },
  // Aerial of the Namib dune sea
  namibia: {
    src: unsplash("photo-1639402478840-1f531c8cd989"),
    fallback: "linear-gradient(160deg,#d59a4a 0%,#6a3b1c 100%)",
  },
  // Elephant herd crossing a river
  botswana: {
    src: unsplash("photo-1706007989994-7cc0c5a866af"),
    fallback: "linear-gradient(180deg,#7b8a6a 0%,#2c3326 100%)",
  },
  // Victoria Falls at sunset
  zimbabwe: {
    src: unsplash("photo-1618811308896-d279d72fdf4d"),
    fallback: "linear-gradient(180deg,#c98a4b 0%,#3b3029 100%)",
  },
  // Giraffe silhouette at sunset
  cta: {
    src: unsplash("photo-1597419957697-30385606b5b4"),
    fallback: "linear-gradient(180deg,#e09a4c 0%,#7a3a1e 60%,#1b1411 100%)",
  },
};
