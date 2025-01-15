/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        port: '',
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/storage/**',
      }
    ]
  },
};

export default nextConfig;
