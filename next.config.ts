import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    unoptimized: true,
    domains: ['www.mylocalmasjid.com'],
  },
};

export default nextConfig;
