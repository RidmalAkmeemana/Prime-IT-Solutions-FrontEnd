/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  trailingSlash: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  basePath: "",
  assetPrefix: "",
};

export default nextConfig;
