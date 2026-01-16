import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    unoptimized: true,
    domains: ['www.mylocalmasjid.com'],
  },
  eslint: {
    // Don't fail build on ESLint warnings/errors
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Handle pdfjs-dist canvas dependency (not needed in browser)
    config.resolve.alias.canvas = false;
    return config;
  },
  async redirects() {
    return [
      {
        source: '/how-we-integrate',
        destination: '/for-masjids',
        permanent: true, // 301 redirect
      },
      // Redirect /solutions to /for-masjids
      // but keep /solutions/* pages - they're still valid
      {
        source: '/solutions',
        destination: '/for-masjids',
        permanent: true,
      },
      // Legacy route redirects to unified location page
      {
        source: '/prayer-times/:city',
        destination: '/location/:city',
        permanent: true, // 301 redirect for SEO
      },
      // Redirect /masjids/:city to /location/:city EXCEPT for special pages
      // Use regex to exclude 'finder' and 'near' which are actual pages
      {
        source: '/masjids/:city((?!finder|near)[^/]+)',
        destination: '/location/:city',
        permanent: true,
      },
      {
        source: '/masjids/:city/:area',
        destination: '/location/:area',
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "mylocalmasjid",
  project: "mylocalmasjid-website",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  sourcemaps: {
    disable: true,
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#automaticvercelcronmonitoring
  automaticVercelMonitors: true,
});
