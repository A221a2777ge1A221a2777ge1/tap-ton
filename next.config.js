/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js configuration options
};

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "aaron-gittinger",
  project: "javascript-nextjs",
});
