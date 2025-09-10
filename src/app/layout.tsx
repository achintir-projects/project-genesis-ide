import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Genesis IDE - AI-Powered App Generation",
  description: "Transform your ideas into fully functional mobile and web applications with the power of AI.",
  keywords: ["AI", "App Generation", "React Native", "Expo", "Mobile Development", "IDE"],
  authors: [{ name: "Project Genesis Team" }],
  openGraph: {
    title: "Project Genesis IDE",
    description: "AI-powered app generation platform",
    url: "https://project-genesis-ide.vercel.app",
    siteName: "Project Genesis IDE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Genesis IDE",
    description: "AI-powered app generation platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}