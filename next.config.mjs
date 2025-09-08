/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ["http://localhost:3000", "https://calcpro.online"],
  },
  typescript: {
    // Tell Next.js to use our custom tsconfig for builds
    tsconfigPath: "./tsconfig.json",
  },
};

export default nextConfig;
