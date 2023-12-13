/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'noun.pics',
            port: '',
            pathname: '/**',
         },
      ],
   },
})

//module.exports = nextConfig
