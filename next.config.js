/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["image.tmdb.org", "via.placeholder.com"],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
