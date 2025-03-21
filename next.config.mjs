/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.worldweatheronline.com',
        port: '',
        pathname: '/**',
      },
    ]
  }
 };

export default nextConfig;
