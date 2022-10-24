/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.freepnglogos.com']
  }
};

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
}

const withPWA = require("next-pwa")(pwaConfig);

module.exports = withPWA(nextConfig);
