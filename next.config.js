
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
};

export default nextConfig;
