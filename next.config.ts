import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
    NEXT_PUBLIC_RAKUTEN_APP_ID: process.env.NEXT_PUBLIC_RAKUTEN_APP_ID,
  },
}

export default nextConfig
