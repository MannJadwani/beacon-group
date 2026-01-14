import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ScrollAos } from "@/components/ui/ScrollAos";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bricknet",
  description:
    "Bricknet - Building Your Vision from the Ground Up. Professional construction services with unmatched quality and expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="scroll-smooth">
        <body className={`${inter.variable} font-sans antialiased`}>
          <ScrollAos />
          {children}
        </body>
      </html>
  );
}
