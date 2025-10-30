import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriSight - AI-Powered Plant Disease Detection",
  description: "Detect, prevent, and understand crop diseases using AI image analysis and LLM-powered insights. Helping farmers and agriculture students protect their crops.",
  keywords: "agriculture, plant disease, AI, machine learning, farming, crop health, sustainable farming",
  authors: [{ name: "AgriSight Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#22c55e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

