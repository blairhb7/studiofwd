/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // The ported marketing copy contains many apostrophes and the
    // site uses plain <a> tags for its three routes. Don't let lint
    // rules block production builds.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
