import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmoothScroll from "../components/providers/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TodoApp - Your Personal Task Manager",
  description: "A modern, responsive todo application for managing your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-optimized">
      <body
        className={`antialiased bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 scroll-container`}
      >
        <div className="scroll-optimized" style={{contain: 'layout style paint'}}>
          <Navbar />
          <SmoothScroll>
            <main className="flex min-h-screen flex-col overflow-hidden">
              {children}
            </main>
          </SmoothScroll>
          <Footer />
        </div>
      </body>
    </html>
  );
}
