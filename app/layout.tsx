import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ----------------------------
// ✔ Correct Metadata Export
// ----------------------------
export const metadata: Metadata = {
  title: "RedCardRetail - Premium Jerseys",
  description:
    "Ultra-minimal, premium quality solid-color jerseys. Clean design, perfect fit.",
  generator: "v0.app",
};

// ----------------------------
// ✔ Correct Viewport Export
// ----------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// ----------------------------
// ✔ Root Layout Component
// ----------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          {children}
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
