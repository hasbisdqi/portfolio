/** @type {import('next').NextConfig} */
export default {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    },
    transpilePackages: ['next-mdx-remote']
};