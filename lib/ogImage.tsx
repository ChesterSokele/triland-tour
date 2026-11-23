import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Branded 1200x630 share card, generated at build time so no external image is needed. */
export function ogImage(title: string, eyebrow = "Tri-land Tours") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          color: "#f3ead8",
          background: "linear-gradient(160deg,#100e0c 0%,#3a2218 55%,#b4532c 100%)",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", color: "#e0a24a" }}>{eyebrow}</div>
        <div style={{ fontSize: 76, lineHeight: 1.05, marginTop: 24, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.8 }}>Golf & safari journeys across Southern Africa</div>
      </div>
    ),
    OG_SIZE,
  );
}
