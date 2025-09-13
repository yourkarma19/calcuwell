/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
    {
      key: 'Content-Security-Policy',
      value: `
        default-src 'self';
        script-src 'self' 'nonce-{{nonce}}' 'strict-dynamic' https: http: 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' blob: data: https://picsum.photos https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net;
        font-src 'self' https://fonts.gstatic.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors ${isDev ? "'self' *" : "'self' *.cloudworkstations.dev"};
        connect-src 'self' vitals.vercel-insights.com https://www.google-analytics.com https://stats.g.doubleclick.net;
        frame-src 'self' https://googleads.g.doubleclick.net https://www.googletagmanager.com;
        upgrade-insecure-requests;
      `.replace(/\s{2,}/g, ' ').trim(),
    },
    {
      key: 'Referrer-Policy',
      value: 'origin-when-cross-origin',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
