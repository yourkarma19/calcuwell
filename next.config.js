/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Tell Next.js to use our custom tsconfig for builds
        tsconfigPath: './tsconfig.src.json',
    },
    devIndicators: {
        allowedDevOrigins: [
            "6000-firebase-studio-1755238988662.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev"
        ]
    }
};

export default nextConfig;
