/** @type {import('next').NextConfig} */
const nextConfig = {
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
