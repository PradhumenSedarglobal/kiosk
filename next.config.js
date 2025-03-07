/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.NEXT_PUBLIC_ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  i18n,
  trailingSlash: false,
  images: {
    loader: "akamai",
    path: "",
    deviceSizes: [
      32, 96, 480, 512, 640, 750, 828, 1080, 1200, 1440, 1600, 1920,
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      "api.sedarglobal.com",
      "uatapi.sedarglobal.com",
      "dxbapi.sedarglobal.com",
      "sedarglobal-nextjs-mui-one.vercel.app",
    ],
    minimumCacheTTL: 6000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.sedarglobal.com",
      },
    ],
  },
  webpack(config, { isServer }) {
    config.resolve.fallback = { fs: false };
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        "@sentry": {
          test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
          name: "@sentry",
          priority: 10,
          reuseExistingChunk: false,
        },
      };
    }
    config.optimization.minimizer.push(
      new TerserPlugin(),
      new CssMinimizerPlugin()
    );
    return config;
  },
  async headers() {
    return [
      {
        source: "/:all*(otf|ttf|woff|woff2)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|png|webp)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  sentry: {
    hideSourceMaps: true,
    allowUrls: [/https?:\/\/((api|www)\.)?sedarglobal\.com/],
    widenClientFileUpload: true,
    transpileClientSDK: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
  transpilePackages: ["mui-tel-input"],
  experimental: {
    esmExternals: true,
  },
  swcMinify: true,
};

module.exports = withBundleAnalyzer(nextConfig);