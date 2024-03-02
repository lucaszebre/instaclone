/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
      remotePatterns: [
          { protocol: 'https', hostname: 'github.com' },
          { protocol: 'https', hostname: 'utfs.io' },
      ],
  }, reactStrictMode: true, 
  


};

module.exports = nextConfig;

