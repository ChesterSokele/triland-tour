import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography comes from Unsplash; only the exact query used in lib/images.ts is allowed.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        search: "?auto=format&fit=crop&w=2400&q=80",
      },
    ],
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
