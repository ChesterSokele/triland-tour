import { Bodoni_Moda, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";

const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], style: ["normal", "italic"], display: "swap" });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"], display: "swap" });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const fontClassName = `${bodoni.variable} ${instrument.variable} ${plexMono.variable}`;
