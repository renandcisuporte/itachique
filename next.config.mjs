/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  // distDir: 'dist',
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
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
