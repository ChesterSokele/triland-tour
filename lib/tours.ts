import type { ImageKey } from "./images";
import type { TourImageKey } from "./tourImages";

export type TourId = "golf" | "safari";

type TourDay = {
  /** Picture of what you do that day. */
  activity: TourImageKey;
  /** Picture of where you sleep; omitted on the departure day. */
  stay?: TourImageKey;
};

type Tour = {
  /** URL path, also used by the nav and the home page. */
  path: string;
  /** Hero photo, from lib/images.ts. */
  hero: ImageKey;
  guests: { min: number; max?: number };
  /** One entry per itinerary day, in the same order as the copy in lib/i18n. */
  days: TourDay[];
};

export const TOURS: Record<TourId, Tour> = {
  golf: {
    path: "/golf-safari",
    hero: "golfJourney",
    guests: { min: 3 },
    days: [
      { activity: "windhoek", stay: "stayWindhoekCountryClub" },
      { activity: "golfDesert", stay: "stayWindhoekCountryClub" },
      { activity: "aridRoad", stay: "staySossusQuiverCamp" },
      { activity: "duneClimb", stay: "staySossusQuiverCamp" },
      { activity: "flamingos", stay: "stayProteaHotel" },
      { activity: "coastalGolf", stay: "stayProteaHotel" },
      { activity: "quadBiking", stay: "stayProteaHotel" },
      { activity: "inlandRocks", stay: "staySophienhofLodge" },
      { activity: "brownGolf", stay: "staySophienhofLodge" },
      { activity: "etoshaZebra", stay: "stayOkaukuejo" },
      { activity: "etoshaGiraffe", stay: "stayNamutoni" },
      { activity: "golfFlag", stay: "stayTsumeb" },
      { activity: "longRoad", stay: "stayWindhoekCountryClub" },
      { activity: "departure" },
    ],
  },
  safari: {
    path: "/three-country-safari",
    hero: "safariJourney",
    guests: { min: 3, max: 6 },
    days: [
      { activity: "waterberg", stay: "stayWaterberg" },
      { activity: "etoshaElephant", stay: "stayOkaukuejo" },
      { activity: "etoshaGame", stay: "stayHalali" },
      { activity: "giraffeRoad", stay: "stayNamutoni" },
      { activity: "kavangoAerial", stay: "stayKaisosi" },
      { activity: "kavangoBoat", stay: "stayMahangu" },
      { activity: "mahangoElephants", stay: "stayMahangu" },
      { activity: "borderRoad", stay: "stayTownLodge" },
      { activity: "chobeBoat", stay: "stayTownLodge" },
      { activity: "victoriaFalls", stay: "stayIllala" },
      { activity: "departureSafari" },
    ],
  },
};
