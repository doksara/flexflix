/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["image.tmdb.org", "via.placeholder.com", "placehold.co"],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
}

module.exports = nextConfig
