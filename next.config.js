/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cms-news-2025.s3.sa-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  // Ensure we're using App Router only
  experimental: {
    // Remove if causing issues
  },
}

module.exports = nextConfig

