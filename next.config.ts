import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export (replaces old `next export`)
  output: "export",

  // Required for hosting inside a subfolder (cPanel)
  basePath: "",
  assetPrefix: "",

  // Disable image optimization for static hosting
  images: {
    unoptimized: true,
  },

  // Ignore ESLint and TypeScript build errors during export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
