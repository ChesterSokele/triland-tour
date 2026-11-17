import type { ImageKey } from "./images";
import type { TourImageKey } from "./tourImages";

export type TourId = "golf" | "safari";

type Tour = {
  /** URL path, also used by the nav and the home page. */
  path: string;
  /** Hero photo, from lib/images.ts. */
  hero: ImageKey;
  guests: { min: number; max?: number };
  /** One photo per itinerary day, in the same order as the copy in lib/i18n. */
  days: TourImageKey[];
};

export const TOURS: Record<TourId, Tour> = {
  golf: {
    path: "/golf-safari",
    hero: "golfJourney",
    guests: { min: 3 },
    days: [
      "windhoek", // 1
      "golfDesert", // 2
      "aridRoad", // 3
      "duneClimb", // 4
      "flamingos", // 5
      "rossmundGolf", // 6
      "quadBiking", // 7
      "inlandRocks", // 8
      "outjo", // 9
      "etoshaZebra", // 10
      "etoshaGiraffe", // 11
      "tsumeb", // 12
      "windhoekCity", // 13
      "departure", // 14
    ],
  },
  safari: {
    path: "/three-country-safari",
    hero: "safariJourney",
    guests: { min: 3, max: 6 },
    days: [
      "waterberg", // 1
      "etoshaElephant", // 2
      "etoshaGame", // 3
      "giraffeRoad", // 4
      "kavango", // 5
      "mahangu", // 6
      "mahangoElephants", // 7
      "borderRoad", // 8
      "chobeBoat", // 9
      "victoriaFalls", // 10
      "departureSafari", // 11
    ],
  },
};
