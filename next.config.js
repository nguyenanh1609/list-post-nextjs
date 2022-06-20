/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.dummyapi.io", "randomuser.me"],
  },
  experimental: { esmExternals: true },
};

module.exports = nextConfig;
