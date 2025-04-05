/** @type {import('next').NextConfig} */
export default {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    },
    transpilePackages: ['next-mdx-remote']
};