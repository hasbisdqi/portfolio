import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import { CommandPalette } from "@/components/command-palette";
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
    title: "Hasbi Assidiqi — Full Stack Developer & Systems Engineer",
    description: "Personal portfolio of Hasbi Assidiqi. Crafting modern digital products where thoughtful design meets clean, scalable code.",
    openGraph: {
      title: "Hasbi Assidiqi — Full Stack Developer & Systems Engineer",
      description: "Crafting digital products where thoughtful design meets clean, scalable code.",
      url: "https://rnghbt.me",
      siteName: "Hasbi Assidiqi",
      images: [
        {
          url: getOgImageUrl('Hasbi Assidiqi'),
          width: 1200,
          height: 630,
          alt: "Hasbi Assidiqi Portfolio",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hasbi Assidiqi — Full Stack Developer",
      description: "Crafting digital products where thoughtful design meets clean, scalable code.",
      images: [getOgImageUrl('Hasbi Assidiqi')],
    },
  };
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} scroll-smooth`} suppressHydrationWarning>
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
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
