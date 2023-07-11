/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"]
  },
  transpilePackages: ["react-tilt"]
}

module.exports = nextConfig
