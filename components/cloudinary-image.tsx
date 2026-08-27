import { toDataURL } from "@/lib/utils";
import Image from "next/image";
import { ImgHTMLAttributes } from "react";

interface CloudinaryImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    cloudName?: string;
    fill?: boolean;
}

export default async function CloudinaryImage({
    src,
    alt = "",
    width,
    height,
    fill = false,
    cloudName = "doj9hfdji",
    className = "",
    sizes,
    ...props
}: CloudinaryImageProps) {

    if (!src) return null;
    src = src.trim();

    const isFullUrl = src.startsWith("http");
    let fullSrc = "";
    let blurSrc = "";

    if (isFullUrl) {
        fullSrc = src;
        const urlHasUpload = src.includes("/upload/") && src.includes("res.cloudinary.com");

        // Sisipkan transformasi Cloudinary jika benar berasal dari Cloudinary
        if (urlHasUpload) {
            blurSrc = await toDataURL(src.replace("/upload/", "/upload/w_10,h_10,q_20,f_auto/"));
        } else {
            // fallback aman untuk URL luar seperti Unsplash atau domain lain
            blurSrc = await toDataURL(src);
        }
    } else {
        const baseURL = `https://res.cloudinary.com/${cloudName}/`;
        fullSrc = `${baseURL}${src}`;
        blurSrc = await toDataURL(`${baseURL}w_10,h_10,q_20,f_auto/${src}`);
    }

    // Jika tidak pakai fill, jangan pakai <div> agar aman di <p>
    if (!fill) {
        return (
            <Image
                src={fullSrc}
                alt={alt}
                placeholder="blur"
                blurDataURL={blurSrc}
                width={typeof width === "string" ? parseInt(width, 10) : width}
                height={typeof height === "string" ? parseInt(height, 10) : height}
                sizes={sizes}
                className={className}
                {...props}
            />
        );
    }

    // Kalau pakai fill, kita butuh wrapper <div>
    return (
        <div className={`relative ${fill ? "w-full h-full" : ""}`}>
            <Image
                src={fullSrc}
                alt={alt}
                placeholder="blur"
                blurDataURL={blurSrc}
                fill
                sizes={sizes}
                className={className}
                {...props}
            />
        </div>
    );
}
