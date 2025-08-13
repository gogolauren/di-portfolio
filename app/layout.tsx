import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights you need
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add Clash Grotesk Display as a local font
const clashGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/ClashGrotesk-Regular.woff2",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/fonts/ClashGrotesk-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/ClashGrotesk-Semibold.woff2",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../public/fonts/ClashGrotesk-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-clash-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Di's Portfolio",
  description: "Di's portfolio showcasing projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body
        className={`${dmSans.variable} ${geistMono.variable} ${clashGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
