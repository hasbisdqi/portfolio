import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import { getOgImageUrl } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "My Awesome Site",
    description: "Explore my projects, blog posts, and personal journey.",
    openGraph: {
      title: "My Awesome Site",
      description: "Explore my projects, blog posts, and personal journey.",
      url: "https://rnghbt.me",
      siteName: "My Awesome Site",
      images: [
        {
          url: getOgImageUrl('My Awesome Site'),
          width: 1200,
          height: 630,
          alt: "My Awesome Site OG Image",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "My Awesome Site",
      description: "Explore my projects, blog posts, and personal journey.",
      images: [getOgImageUrl('My Awesome Site')],
    },
  };
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed right-0 m-2 z-50 print:hidden">
            <ModeToggle />
          </div>
          <Navbar>
            {children}
          </Navbar>
        </ThemeProvider>
      </body>
    </html>
  );
}
