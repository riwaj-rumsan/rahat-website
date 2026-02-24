import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We keep output undefined to allow the Edge runtime to work
  
  // 1. Disable Source Maps for production (Saves a lot of space)
  productionBrowserSourceMaps: false,

  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/scss")],
  },

  images: {
    unoptimized: true,
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

  experimental: {
    // 2. Enable server-side minification to shrink the Worker bundle
    serverMinification: true,
  },

  webpack: (config) => {
    config.cache = false;

    // 3. Prevent heavy source maps in Webpack itself
    config.devtool = false;

    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /magic-sdk/,
      /@walletconnect[\\/]web3-provider/,
      /@web3auth[\\/]web3auth/,
      /@walletconnect[\\/]universal-provider/,
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native": "react-native-web",
    };

    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;