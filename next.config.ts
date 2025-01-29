import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
  images: {
    unoptimized: true,
    domains: ['www.mylocalmasjid.com'],
  },
};

export default nextConfig;
