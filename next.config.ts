import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'dl.polyhaven.org' }
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        // Cache videos, fonts, and heavy static assets for 1 year
        source: '/:path*(mp4|webm|woff2|woff|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images for 30 days
        source: '/:path*(jpg|jpeg|png|gif|svg|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

export default nextConfig
