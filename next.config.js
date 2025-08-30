/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Tell Next.js to use our custom tsconfig for builds
        tsconfigPath: './tsconfig.src.json',
    }
};

export default nextConfig;
