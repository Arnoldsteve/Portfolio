import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Header } from "@/components/pages/Header";
import { Footer } from "@/components/pages/Footer";
import { ScrollToTopButton } from "@/components/feature/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Steve Arnold Otieno | Full Stack Engineer",
  description: "Portfolio of Steve Arnold Otieno, a Full Stack Software Engineer specializing in Node.js and PHP ecosystems.",
  openGraph: {
    title: "Steve Arnold Otieno | Full Stack Engineer",
    description: "Portfolio of Steve Arnold Otieno, a Full Stack Software Engineer.",
    url: "https://your-live-portfolio-url.vercel.app", 
    siteName: "Steve Arnold's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steve Arnold Otieno | Full Stack Engineer",
    description: "Portfolio of Steve Arnold Otieno, a Full Stack Software Engineer.",
    images: ["/og-image.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} pt-16 bg-muted scroll-smooth`}>
        <Header />
        {children}
        <Footer />
        <ScrollToTopButton />
        <Toaster richColors />
      </body>
    </html>
  );
}