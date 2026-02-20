import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { metadataDefault } from "@/lib/consts";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: String(metadataDefault.title),
    template: "%s | Escape Roots",
  },
  description: metadataDefault.description,
  icons: metadataDefault.icons,
  openGraph: metadataDefault.openGraph,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <NavBar />
          {children}
          <Footer />
        </NuqsAdapter>

        <Script
          src="https://cdn.lightwidget.com/widgets/lightwidget.js"
          strategy="lazyOnload"
        />

        <GoogleAnalytics gaId="G-RFVQ4295D7" />
      </body>
    </html>
  );
}

