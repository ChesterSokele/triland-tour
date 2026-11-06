/**
 * Placeholder photography for the tour pages: one picture of the day's activity and one of where you stay.
 * These are generic Unsplash stand-ins (a lodge photo is not the actual lodge). To swap in real photos,
 * put the file in /public/images and change `src` here, e.g. src: "/images/sossus-quiver-camp.jpg".
 * `fallback` paints a colour field behind each image so a missing photo still looks intentional.
 */

// Must match an allowed pattern in next.config.ts.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const SAND = "linear-gradient(160deg,#e0b273 0%,#8a4a24 100%)";
const BUSH = "linear-gradient(180deg,#9c8a62 0%,#3a3222 100%)";
const WATER = "linear-gradient(180deg,#7b8a6a 0%,#2c3326 100%)";
const FAIRWAY = "linear-gradient(180deg,#e7b872 0%,#5f6a3a 70%,#2d3320 100%)";
const STAY = "linear-gradient(160deg,#6b5237 0%,#241c15 100%)";

export const TOUR_IMAGES = {
  // Activities and scenery
  windhoek: { src: unsplash("1586100810957-e4a1fed8c645"), fallback: SAND },
  golfDesert: { src: unsplash("1709525617656-5498eefc7d03"), fallback: FAIRWAY },
  aridRoad: { src: unsplash("1563973099335-2d6207996c96"), fallback: SAND },
  duneClimb: { src: unsplash("1634842506742-73d20623d528"), fallback: SAND },
  flamingos: { src: unsplash("1639402479720-fb4464582470"), fallback: WATER },
  coastalGolf: { src: unsplash("1779715836385-f7edea8e6c93"), fallback: FAIRWAY },
  quadBiking: { src: unsplash("1769450290445-3daed0c8fe63"), fallback: SAND },
  inlandRocks: { src: unsplash("1711092047480-4382d9626abc"), fallback: SAND },
  brownGolf: { src: unsplash("1689592607832-2d3dc2774e82"), fallback: FAIRWAY },
  etoshaZebra: { src: unsplash("1572810927822-92fccaae1992"), fallback: BUSH },
  etoshaGiraffe: { src: unsplash("1646345098774-acb16125b6f3"), fallback: BUSH },
  golfFlag: { src: unsplash("1618766279246-206f7c254193"), fallback: FAIRWAY },
  longRoad: { src: unsplash("1785510834536-d8e3bde24416"), fallback: SAND },
  departure: { src: unsplash("1639616322896-357c8e5a449a"), fallback: SAND },
  departureSafari: { src: unsplash("1639616347414-b7904572cb49"), fallback: WATER },
  waterberg: { src: unsplash("1761019197027-fc7dd6d9de7a"), fallback: BUSH },
  etoshaElephant: { src: unsplash("1711613413089-cf9360f78d48"), fallback: BUSH },
  etoshaGame: { src: unsplash("1637336660118-b4635ce8790c"), fallback: BUSH },
  giraffeRoad: { src: unsplash("1781644799435-66343192c7d0"), fallback: BUSH },
  kavangoAerial: { src: unsplash("1722645148077-a7f99c8bcef2"), fallback: WATER },
  kavangoBoat: { src: unsplash("1759252973843-957dc1b5e0e5"), fallback: WATER },
  mahangoElephants: { src: unsplash("1760512559343-aa2ec0abf85c"), fallback: WATER },
  borderRoad: { src: unsplash("1559494487-a5bbc635ed2b"), fallback: BUSH },
  chobeBoat: { src: unsplash("1793691120289-579399d80c95"), fallback: WATER },
  victoriaFalls: { src: unsplash("1759164882609-58b00ec3b09a"), fallback: WATER },

  // Accommodation (stand-ins, not the actual properties)
  stayWindhoekCountryClub: { src: unsplash("1611892440504-42a792e24d32"), fallback: STAY },
  staySossusQuiverCamp: { src: unsplash("1762254804915-967868db1ece"), fallback: STAY },
  stayProteaHotel: { src: unsplash("1759328257280-28bdb3050be3"), fallback: STAY },
  staySophienhofLodge: { src: unsplash("1779216175784-a67b6da108bb"), fallback: STAY },
  stayOkaukuejo: { src: unsplash("1667987566780-3b31fa5485c8"), fallback: STAY },
  stayNamutoni: { src: unsplash("1780067660065-c70dd02aa1f0"), fallback: STAY },
  stayTsumeb: { src: unsplash("1778205015308-1ed324aea202"), fallback: STAY },
  stayWaterberg: { src: unsplash("1632315152441-465a943cc211"), fallback: STAY },
  stayHalali: { src: unsplash("1551882547-ff40c63fe5fa"), fallback: STAY },
  stayKaisosi: { src: unsplash("1781039869379-5561fe260d26"), fallback: STAY },
  stayMahangu: { src: unsplash("1763883420965-63130e7ed221"), fallback: STAY },
  stayTownLodge: { src: unsplash("1781572725438-ac8c41476752"), fallback: STAY },
  stayIllala: { src: unsplash("1748630724971-1f7f14532038"), fallback: STAY },
} as const satisfies Record<string, { src: string; fallback: string }>;

export type TourImageKey = keyof typeof TOUR_IMAGES;
