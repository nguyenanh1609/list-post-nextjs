/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.dummyapi.io", "randomuser.me", "lh3.googleusercontent.com"],
  },
  experimental: { esmExternals: true },
};

module.exports = nextConfig;
