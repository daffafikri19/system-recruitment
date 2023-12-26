/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'filemanager-e-recruitment.teinsolutions.comnull'
            },
            {
                protocol: 'http',
                hostname: 'localhost'
            },
            {
                protocol: 'https',
                hostname: 'filemanager-e-recruitment.teinsolutions.com'
            }
        ]
    }
}

module.exports = nextConfig
