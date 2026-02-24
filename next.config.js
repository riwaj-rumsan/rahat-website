const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ⚠ If this is frontend only, use export instead of standalone
  output: "export",

  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/scss")],
  },

  images: {
    domains: [
      "drive.google.com",
      "rumsan.nyc3.cdn.digitaloceanspaces.com",
      "rahat-rumsan.s3.amazonaws.com",
      "esatya.s3.amazonaws.com",
      "assets.rumsan.net",
      "rahat-rumsan.s3.us-east-1.amazonaws.com",
      "rahat.io",
    ],
  },

  webpack: (config, { isServer }) => {
    // Disable persistent webpack cache (fixes 318MB issue)
    config.cache = false;

    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /magic-sdk/,
      /@walletconnect[\\/]web3-provider/,
      /@web3auth[\\/]web3auth/,
      /@walletconnect[\\/]universal-provider/,
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      reactNative: "react-native-web",
    };

    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  rewrites: async () => [
    {
      source: "/cookie-policy",
      destination: "/cookie-policy.html",
    },
  ],
};

export default nextConfig;
