/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
