import readingTime from "reading-time";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
    const date = new Date(input);
    return date.toLocaleDateString("en-UK", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

/**
 * Counting reading time from the text
 * @param text - Content in string
 * @returns reading time in format "X min read"
 */
export function getReadingTime(text: string): string {
    if (!text) return "0 min read"; // Avoid Error
    return readingTime(text).text;
}

export const toDataURL = (url: string) =>
    fetch(url)
        .then((response) => response.blob())
        .then(
            (blob) =>
                new Promise<string>((resolve, reject) => {
                    blob.arrayBuffer().then((arrayBuffer) => {
                        const reader = Buffer.from(arrayBuffer).toString('base64');
                        resolve(`data:${blob.type};base64,${reader}`);
                    }).catch(reject);
                })
        );

export function getOgImageUrl(title: string): string {
    const baseUrl = "https://res.cloudinary.com/doj9hfdji/image/upload";
    const transformation = "w_1200,h_630,c_fit,co_rgb:ffffff,g_west,x_60,y_-40";
    const textStyle = "arial_60_bold";
    const baseImage = "Hasbi_Assidiqi_dbw0no";

    // Batasi title maksimal 100 karakter
    const maxLength = 100;
    const truncatedTitle =
        title.length > maxLength ? title.slice(0, maxLength - 3) + "..." : title;

    // Encode untuk URL
    const encodedTitle = encodeURIComponent(truncatedTitle);

    return `${baseUrl}/${transformation},l_text:${textStyle}:${encodedTitle}/${baseImage}`;
}



