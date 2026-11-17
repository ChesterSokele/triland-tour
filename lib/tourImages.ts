/**
 * Photography for the tour pages: one picture per itinerary day.
 *
 * - Paths starting with "/images/" are the client's own photos in /public/images.
 * - The rest are generic Unsplash stand-ins. To swap one for a real photo, drop the file in
 *   /public/images and point `src` at it, e.g. src: "/images/windhoek.jpg".
 *
 * `fallback` paints a colour field behind each image so a missing photo still looks intentional.
 */

// Must match an allowed pattern in next.config.ts.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const SAND = "linear-gradient(160deg,#e0b273 0%,#8a4a24 100%)";
const BUSH = "linear-gradient(180deg,#9c8a62 0%,#3a3222 100%)";
const WATER = "linear-gradient(180deg,#7b8a6a 0%,#2c3326 100%)";
const FAIRWAY = "linear-gradient(180deg,#e7b872 0%,#5f6a3a 70%,#2d3320 100%)";

export const TOUR_IMAGES = {
  // The client's own photos
  windhoekCity: { src: "/images/windhoek.jpg", fallback: SAND },
  rossmundGolf: { src: "/images/rossmund-golf-course.jpg", fallback: FAIRWAY },
  outjo: { src: "/images/outjo.jpg", fallback: FAIRWAY },
  tsumeb: { src: "/images/tsumeb.jpg", fallback: FAIRWAY },
  kavango: { src: "/images/kavango.jpg", fallback: WATER },
  mahangu: { src: "/images/mahangu.jpg", fallback: WATER },

  // Unsplash stand-ins
  windhoek: { src: unsplash("1586100810957-e4a1fed8c645"), fallback: SAND },
  golfDesert: { src: unsplash("1709525617656-5498eefc7d03"), fallback: FAIRWAY },
  aridRoad: { src: unsplash("1563973099335-2d6207996c96"), fallback: SAND },
  duneClimb: { src: unsplash("1634842506742-73d20623d528"), fallback: SAND },
  flamingos: { src: unsplash("1639402479720-fb4464582470"), fallback: WATER },
  quadBiking: { src: unsplash("1769450290445-3daed0c8fe63"), fallback: SAND },
  inlandRocks: { src: unsplash("1711092047480-4382d9626abc"), fallback: SAND },
  etoshaZebra: { src: unsplash("1572810927822-92fccaae1992"), fallback: BUSH },
  etoshaGiraffe: { src: unsplash("1646345098774-acb16125b6f3"), fallback: BUSH },
  departure: { src: unsplash("1639616322896-357c8e5a449a"), fallback: SAND },
  waterberg: { src: unsplash("1761019197027-fc7dd6d9de7a"), fallback: BUSH },
  etoshaElephant: { src: unsplash("1711613413089-cf9360f78d48"), fallback: BUSH },
  etoshaGame: { src: unsplash("1637336660118-b4635ce8790c"), fallback: BUSH },
  giraffeRoad: { src: unsplash("1781644799435-66343192c7d0"), fallback: BUSH },
  mahangoElephants: { src: unsplash("1760512559343-aa2ec0abf85c"), fallback: WATER },
  borderRoad: { src: unsplash("1559494487-a5bbc635ed2b"), fallback: BUSH },
  chobeBoat: { src: unsplash("1793691120289-579399d80c95"), fallback: WATER },
  victoriaFalls: { src: unsplash("1759164882609-58b00ec3b09a"), fallback: WATER },
  departureSafari: { src: unsplash("1639616347414-b7904572cb49"), fallback: WATER },
} as const satisfies Record<string, { src: string; fallback: string }>;

export type TourImageKey = keyof typeof TOUR_IMAGES;
