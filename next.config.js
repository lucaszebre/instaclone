/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['github.com', 'utfs.io'],
      remotePatterns: [
          { protocol: 'https', hostname: 'github.com' },
          { protocol: 'https', hostname: 'utfs.io' },
      ],
  },
};

module.exports = nextConfig;

