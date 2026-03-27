import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Header } from "@/components/pages/Header";
import { Footer } from "@/components/pages/Footer";
import { ScrollToTopButton } from "@/components/feature/ScrollToTopButton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TechnicalTwin } from "@/components/ai/technical-twin";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Steve Arnold Otieno | Full Stack Engineer",
  description:
    "Expert Full Stack Engineer specializing in NestJS, React, and high-scale SaaS architectures. Building secure, data-driven solutions with 99.8% reliability.",
  openGraph: {
    title: "Steve Arnold | Software Architect & Full Stack Engineer",
    description:
      "Explore the portfolio of Steve Arnold Otieno, featuring GradeHub and high-performance enterprise systems.",
    url: "https://steve-arnold.vercel.app",
    siteName: "Steve Arnold's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Steve Arnold Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steve Arnold | Full Stack Engineer",
    description:
      "SaaS & Enterprise specialist building modern web platforms at scale.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Moved scroll-smooth here for better browser support
    <html lang="en" className="light scroll-smooth">
      <body
        className={`${inter.className} min-h-screen pt-16 bg-slate-50 text-slate-950 antialiased`}
      >
        <TooltipProvider delayDuration={0}>
          <Header />
          <main>{children}</main>
          <TechnicalTwin />
          <Footer />
          {/* <ScrollToTopButton /> */}
          <Toaster richColors position="top-center" />
        </TooltipProvider>
      </body>
    </html>
  );
}
