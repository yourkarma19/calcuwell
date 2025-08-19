/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // This is to fix a build error for `handlebars` which is a dependency of genkit.
    // @see https://github.com/firebase/genkit/issues/323
    config.resolve.alias.handlebars = 'handlebars/dist/handlebars.min.js';
    return config;
  },
};

module.exports = nextConfig;
