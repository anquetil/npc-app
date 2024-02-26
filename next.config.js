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
   webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
   }
})

//module.exports = nextConfig
