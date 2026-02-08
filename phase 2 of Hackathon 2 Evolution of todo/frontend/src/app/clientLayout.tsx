"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/providers/smooth-scroll";
import AuthProvider from "@/components/providers/session-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const AuthRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  return (
    <AuthProvider>
      <SmoothScroll>
        <Navbar />
        <main className="flex min-h-screen flex-col overflow-hidden">
          {children}
        </main>
        {!AuthRoutes.includes(pathname) && <Footer />}
        <Toaster />
      </SmoothScroll>
    </AuthProvider>
  );
}
