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
