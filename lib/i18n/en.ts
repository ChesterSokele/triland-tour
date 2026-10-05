// English is the source dictionary; its shape defines the Dictionary type every language must match.
export const en = {
  meta: {
    skip: "Skip to content",
    langLabel: "Language",
  },
  nav: {
    journeys: "Journeys",
    destinations: "Destinations",
    about: "About",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Triland Tour, back to top",
  },
  hero: {
    eyebrow: "Triland Tour · Southern Africa",
    lines: ["Two journeys.", "One untamed", "continent."],
    body: "Handcrafted Namibia itineraries for golfers and safari-goers who want more than a checklist — from red dune fairways to the tracks of the Big Five.",
    primary: "Explore the journeys",
    secondary: "Plan your trip",
    scroll: "Scroll",
    location: "Deadvlei, Namibia",
  },
  intro: {
    label: "About the journeys",
    lines: ["Not a holiday.", "A journey across", "a continent."],
    lead: "Two journeys designed for travellers who want to experience Southern Africa differently.",
    fairways: "One follows the fairways.",
    wildlife: "The other follows the wildlife.",
    caption: "Footprints on a dune crest, Namib Desert",
  },
  journeys: {
    label: "The journeys",
    enquire: "Enquire by email",
    golf: {
      index: "Journey 01",
      eyebrow: "Golf & Landscape",
      title: "Namibia Golf Escape",
      body: "Play fairways carved between red dunes, then swap clubs for binoculars on afternoon game drives — a trip that pampers as much as it challenges.",
      stats: [
        { value: "10", label: "Days" },
        { value: "3", label: "Guests min." },
      ],
      tags: ["Golf", "Game drives", "Pamper yourself", "Landscape"],
      subject: "Enquiry: Namibia Golf Escape",
    },
    safari: {
      index: "Journey 02",
      eyebrow: "Wildlife Safari",
      title: "In Search of the Big Five",
      body: "Cross three countries in pursuit of Africa's most iconic wildlife, from Namibia's plains to the waterways of Botswana and Zimbabwe.",
      stats: [
        { value: "3", label: "Countries" },
        { value: "12", label: "Days" },
        { value: "3–6", label: "Guests" },
      ],
      tags: ["Namibia", "Botswana", "Zimbabwe"],
      subject: "Enquiry: In Search of the Big Five",
    },
  },
  golfFeature: {
    eyebrow: "The golf",
    lines: ["Where the fairway", "meets the desert."],
    body: "Tee off in the cool of the morning, with watered greens set against ochre hills and open sky. By afternoon the clubs are packed away and the landscape takes over: dunes, dry riverbeds and a light that changes by the hour.",
    labels: ["Desert", "Golf", "Namibia"],
  },
  safariFeature: {
    eyebrow: "The safari",
    title: "Follow the tracks.",
    body: "Leave the tar road behind. Track lion, leopard, elephant, buffalo and rhino with guides who read the ground like a map, and move deeper each day: from open plains to river channels to the spray of Victoria Falls.",
    hint: "Move your cursor to search the dark",
    bigFive: ["Lion", "Leopard", "Elephant", "Buffalo", "Rhino"],
  },
  route: {
    eyebrow: "The route",
    title: "Namibia to Zimbabwe",
    hint: "Keep scrolling to travel east",
    mapLabel: "Route map from Sossusvlei to Victoria Falls",
    countries: [
      {
        name: "Namibia",
        region: "Sossusvlei · Windhoek · Etosha",
        kicker: "The desert",
        body: "Red dunes over the Namib, then north to the white salt pan of Etosha, where wildlife gathers at the waterholes.",
        facts: [
          { value: "325 m", label: "Big Daddy dune, Sossusvlei" },
          { value: "55M yrs", label: "Age of the Namib, the oldest desert on Earth" },
        ],
      },
      {
        name: "Botswana",
        region: "Okavango Delta · Chobe",
        kicker: "The water",
        body: "The desert gives way to water. Glide through the Okavango by mokoro and watch elephant herds cross the Chobe River at dusk.",
        facts: [
          { value: "15,000 km²", label: "Okavango Delta at peak flood" },
          { value: "130,000", label: "Elephants in Botswana, Africa's largest population" },
        ],
      },
      {
        name: "Zimbabwe",
        region: "Victoria Falls",
        kicker: "The thunder",
        body: "The journey ends at Mosi-oa-Tunya, the smoke that thunders, where the Zambezi drops into a single basalt gorge.",
        facts: [
          { value: "1,708 m", label: "Width of Victoria Falls" },
          { value: "108 m", label: "Height of the drop" },
        ],
      },
    ],
  },
  stats: {
    label: "The journey in numbers",
    items: ["Countries", "Days", "Experiences", "Untamed continent"],
  },
  cta: {
    lines: ["Ready to plan", "your journey?"],
    body: "Get in touch and we'll build an itinerary around what you want to see and play.",
    emailLabel: "Write to us",
    start: "Start planning",
    copy: "Copy address",
    copied: "Copied",
    copyFallback: "Selected — press Ctrl+C",
    subject: "Planning my Southern Africa journey",
  },
  footer: {
    tagline: "Golf & Big Five journeys across Namibia, Botswana & Zimbabwe.",
    rights: "© 2026 Triland Tour",
    backToTop: "Back to top",
  },
  images: {
    hero: "Dead camel thorn trees on the white clay pan of Deadvlei, beneath a towering red dune in Namibia",
    intro: "A line of footprints crossing the crest of a sand dune",
    golfJourney: "A golf green lit by a low evening sun, with long shadows across the fairway",
    golfFeature: "A red flag on a golf green at dusk under a pink and grey sky",
    safariJourney: "Guests in an open safari vehicle watching a lion resting in the grass",
    safariFeature: "A leopard walking across open ground",
    namibia: "Aerial view of golden sand dunes in the Namib Desert",
    botswana: "A herd of elephants wading across a river",
    zimbabwe: "Victoria Falls pouring into its gorge at sunset",
    cta: "A giraffe silhouetted against an orange African sunset",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
