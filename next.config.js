/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    swcPlugins: [['next-superjson-plugin', {}]],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
}

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname
    return config
  },
}
