
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
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
  devIndicators: {
    // This is to fix a warning that shows up in the development environment.
    // @see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
    allowedDevOrigins: [
        'https://*.cloudworkstations.dev',
    ]
  },
};

export default nextConfig;
