/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linktr.ee',
      },
    ],
  },
  typescript: { ignoreBuildErrors: true },
}

export default nextConfig