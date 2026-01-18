import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Nunito } from "next/font/google";

import { ScrollAos } from "@/components/ui/ScrollAos";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Beacon Trusteeship",
  description:
    "Beacon Trusteeship Limited - trustee, security, and escrow solutions for issuers, lenders, and investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${manrope.variable} ${nunito.variable} font-sans antialiased`}>
        <ScrollAos />
        {children}
      </body>
    </html>
  );
}
