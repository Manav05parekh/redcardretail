/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // ✅ Add this for Hostinger / Node hosting
  output: "standalone",
};

export default nextConfig;
