import path from 'path';
import { fileURLToPath } from 'url';

// Replicate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Cloudflare next-on-pages often works best with 'export' for static sites

  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/scss")],
  },

  images: {
    unoptimized: true, // Required for 'output: export'
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

  webpack: (config) => {
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
      "react-native": "react-native-web",
    };

    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Note: rewrites do not work with 'output: export'
  // If you need these, you'll need to handle them via Cloudflare Redirects/Rules
};

export default nextConfig;