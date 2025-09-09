import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Do NOT use static export; we rely on API routes and dynamic rendering
  webpack: (config) => {
    // Avoid bundling Node built-ins on the client
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  transpilePackages: ["@tonconnect/ui-react"],
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "tonup-t0iem",
  project: "javascript-nextjs",
});
