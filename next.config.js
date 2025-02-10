import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.glsl$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return {
      ...config,
      optimization: {
        // weird error with cssnanosimple
        minimize: false,
      },
    };
  },
  experimental: {
    turbo: {
      rules: {
        "*.glsl": {
          loaders: ["raw-loader"],
          as: "*.js",
        },
      },
    },
  },
};

export default withContentlayer(nextConfig);
