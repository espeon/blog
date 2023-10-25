const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
}

module.exports = withContentlayer(nextConfig)
