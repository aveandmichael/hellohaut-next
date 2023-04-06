/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "cdnjs.cloudflare.com",
      "media.douglas.de",
    ],
  },
}

module.exports = nextConfig
