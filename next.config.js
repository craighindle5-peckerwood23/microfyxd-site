/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media.base44.com" },
      { protocol: "https", hostname: "img.magnific.com" },
      { protocol: "https", hostname: "editorial.pxcrush.net" },
    ],
  },
  // Suppress build warnings for missing optional env vars at compile time
  experimental: {
    serverComponentsExternalPackages: ["twilio"],
  },
};

module.exports = nextConfig;
