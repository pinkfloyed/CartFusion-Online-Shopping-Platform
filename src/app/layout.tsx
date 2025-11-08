"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-200">
      <body className="text-gray-900 min-h-screen flex flex-col">
        <SessionProvider>
          <Navbar />

          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>

          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
