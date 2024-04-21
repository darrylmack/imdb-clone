/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'image.tmdb.org',
      'img.youtube.com',
      'i.ytimg.com',
      'www.youtube.com'
    ]
  }
}

module.exports = nextConfig
