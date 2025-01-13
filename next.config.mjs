/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbopack: false,
  },
  images: {
    domains: ["*", "nr9wfol2re6j0lph.public.blob.vercel-storage.com"],
  },
};

export default nextConfig;
