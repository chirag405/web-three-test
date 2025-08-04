import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PWAInstall } from "../components/PWAInstall";
import { PWAStatus } from "../components/PWAStatus";
import { TestPWA } from "../components/TestPWA";
import { ManualInstall } from "../components/ManualInstall";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebXR UI Library - 2D Card",
  description:
    "A Next.js application with Three.js for creating 2D cards and 3D wireframe rooms",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WebXR UI Library",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WebXR UI Library" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        {children}
        <TestPWA />
        <PWAInstall />
        <PWAStatus />
        <ManualInstall />
      </body>
    </html>
  );
}
