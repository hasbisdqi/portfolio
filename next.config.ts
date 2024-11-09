import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
                pathname: "/1920x1080",
            },
        ],
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
