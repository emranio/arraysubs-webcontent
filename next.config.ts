import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/changelog',
        destination: '/arraysubs/changelog/',
        permanent: true,
      },
      {
        source: '/download',
        destination: '/arraysubs/download/',
        permanent: true,
      },
      {
        source: '/plans',
        destination: '/arraysubs/plans/',
        permanent: true,
      },
      {
        source: '/compare',
        destination: '/arraysubs/compare/',
        permanent: true,
      },
      {
        source: '/compare/:path*',
        destination: '/arraysubs/compare/:path*/',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/arraysubs/features/',
        permanent: true,
      },
      {
        source: '/features/:path*',
        destination: '/arraysubs/features/:path*/',
        permanent: true,
      },
      {
        source: '/gateways',
        destination: '/arraysubs/gateways/',
        permanent: true,
      },
      {
        source: '/gateways/:path*',
        destination: '/arraysubs/gateways/:path*/',
        permanent: true,
      },
      {
        source: '/use-cases',
        destination: '/arraysubs/use-cases/',
        permanent: true,
      },
      {
        source: '/use-cases/:path*',
        destination: '/arraysubs/use-cases/:path*/',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default nextConfig;
