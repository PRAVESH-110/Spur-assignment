import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",       // 👈 REQUIRED for static sites
  reactCompiler: true,
  images: {
    unoptimized: true,   // 👈 REQUIRED for static hosting
  },
};

export default nextConfig;
