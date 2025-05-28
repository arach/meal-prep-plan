import type { NextConfig } from 'next';

export const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};