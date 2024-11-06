/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        port: '',
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/storage/**',
      }
    ]
  }
};

export default nextConfig;
