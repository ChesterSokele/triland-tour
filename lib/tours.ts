import type { ImageKey } from "./images";
import type { TourImageKey } from "./tourImages";

export type TourId = "golf" | "safari" | "namibia";

type Tour = {
  /** URL path, also used by the nav and the home page. */
  path: string;
  /** Hero photo, from lib/images.ts. */
  hero: ImageKey;
  guests: { min: number; max?: number };
  /** One photo per itinerary day, in the same order as the copy in lib/i18n. */
  days: TourImageKey[];
  /** Day numbers (1-based) the guest cannot remove from a custom itinerary. */
  locked: number[];
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
      "seals", // 7
      "inlandRocks", // 8
      "outjo", // 9
      "etoshaZebra", // 10
      "etoshaGiraffe", // 11
      "tsumeb", // 12
      "windhoekCity", // 13
      "departure", // 14
    ],
    locked: [1, 2, 5, 6, 8, 12, 13],
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
    locked: [1, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  namibia: {
    path: "/namibia-complete-route",
    hero: "namibia",
    guests: { min: 3 },
    days: [
      "windhoek", // 1
      "aridRoad", // 2 Kalahari
      "inlandRocks", // 3 scenic drive to Sesriem
      "duneClimb", // 4 Sossusvlei
      "quadBiking", // 5 coast
      "flamingos", // 6 Walvis Bay
      "etoshaZebra", // 7
      "etoshaGiraffe", // 8
      "windhoekCity", // 9
      "departure", // 10
    ],
    locked: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // fixed route: no choice
  },
};
