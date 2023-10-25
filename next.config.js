const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
}

module.exports = withContentlayer(nextConfig)
