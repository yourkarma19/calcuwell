
/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Tell Next.js to use our custom tsconfig for builds
        tsconfigPath: './tsconfig.src.json',
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.ts$/,
            use: 'ts-loader',
        });
        return config;
    },
    experimental: {
        // This is to allow requests from the development environment
        allowedDevOrigins: ["https://*.cloudworkstations.dev"],
    }
};

export default nextConfig;
