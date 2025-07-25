import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
const mont = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-mont",
});

export const metadata: Metadata = {
  title: "SkyStore",
  description: "A minimal cloud-based file manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${mont.variable} antialiased p-6 flex flex-col gap-6`}
        >
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
