/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'

const nextConfig = withPWA({
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
})

export default nextConfig
