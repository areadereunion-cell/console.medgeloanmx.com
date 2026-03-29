import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});   

export const metadata: Metadata = {
  title: "MWM - Medgel México",
  description: "console.medgeloanmx.com",
};

export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // 🔥 mejor español para evitar triggers de traducción
      translate="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="google" content="notranslate" />
        {/* 🔥 refuerzo extra contra Google Translate */}
        <meta httpEquiv="Content-Language" content="es" />
      </head>
      <body
        className="min-h-full flex flex-col notranslate"
        translate="no"
      >
        {children}
      </body>
    </html>
  );  
}