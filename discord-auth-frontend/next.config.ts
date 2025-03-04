/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'cdn.discordapp.com',
              pathname: '/avatars/**',
          },
      ],
  },
};

module.exports = nextConfig;
