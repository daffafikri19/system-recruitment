/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        domains: ["filemanager-e-recruitment.teinsolutions.com", "localhost:3000", "filemanager-e-recruitment.teinsolutions.comnull"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'filemanager-e-recruitment.teinsolutions.comnull'
            }
        ]
    }
}

module.exports = nextConfig
