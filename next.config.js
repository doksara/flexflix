/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "image.tmdb.org" },
      { hostname: "via.placeholder.com" },
      { hostname: "placehold.co" },
    ],
  },
}

module.exports = nextConfig
