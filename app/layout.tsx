import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
    title: "My Awesome Site",
    description: "Explore my projects, blog posts, and personal journey.",
    openGraph: {
      title: "My Awesome Site",
      description: "Explore my projects, blog posts, and personal journey.",
      url: "https://yourdomain.com",
      siteName: "My Awesome Site",
      images: [
        {
          url: "/api/og?title=My%20Awesome%20Site",
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
      images: ["/api/og?title=My%20Awesome%20Site"],
    },
  };
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <div className="fixed right-0 m-2 z-50">
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
