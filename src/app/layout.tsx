import Footer from "@/app/_components/footer";
import { Inter } from "next/font/google";
import { SITE_TITLE, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";

import "./globals.css";
import HeaderWrapper from "./_components/header-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${SITE_TITLE}`,
  description: `${SITE_TITLE}.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Turun karjalakuoro" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#000" />
        {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}
      </head>
      <body className={inter.className}>
        <HeaderWrapper />
        <div className="min-h-screen pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
