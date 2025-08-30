/** @type {import('next').NextConfig} */
const nextConfig = {
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 300,
    }
};

export default nextConfig;
