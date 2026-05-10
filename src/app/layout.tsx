import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import MouseSpotlight from "@/components/MouseSpotlight";
import CustomCursor from "@/components/CustomCursor";
import CustomContextMenu from "@/components/CustomContextMenu";
import { siteConfig } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="relative flex min-h-full flex-col bg-background text-foreground antialiased cursor-auto sm:cursor-none">
        <CustomCursor />
        <CustomContextMenu />
        <ScrollProgress />
        <MouseSpotlight />
        {/* Atmospheric depth layered radial washes behind all content */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255, 255, 255, 0.04), transparent 60%),
              radial-gradient(ellipse 50% 35% at 85% 90%, rgba(200, 200, 220, 0.03), transparent 65%),
              radial-gradient(ellipse 40% 30% at 15% 75%, rgba(180, 180, 200, 0.02), transparent 65%)
            `,
          }}
        />
        <Navbar />
        <main className="relative z-10 w-full flex-1">
          {children}
        </main>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}