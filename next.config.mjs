/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: 'localhost' },
      {
        protocol: 'https',
        hostname: 'cdn.worldweatheronline.com',
        pathname: '/**',
      },
    ]
  }
 };

export default nextConfig;
