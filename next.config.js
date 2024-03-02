/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['github.com', 'utfs.io'],
      remotePatterns: [
          { protocol: 'https', hostname: 'github.com' },
          { protocol: 'https', hostname: 'utfs.io' },
      ],
  }, reactStrictMode: true, 
  eslint: { 
    ignoreDuringBuilds: true, 
  },
  staticPageGenerationTimeout: 150,


};

module.exports = nextConfig;

