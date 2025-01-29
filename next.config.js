const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Handle PDF renderer
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    return config;
  },
  transpilePackages: ["@react-pdf/renderer"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      }
    ],
  },
};

module.exports = withNextIntl(nextConfig);
