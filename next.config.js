/** @type {import('next').NextConfig} */
const nextConfig = {
  // Headers for PWA
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  // PWA-specific optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization for PWA icons
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

module.exports = nextConfig;
