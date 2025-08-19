import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/pages/Header";
import { Footer } from "@/components/pages/Footer";
import { ScrollToTopButton } from "@/components/feature/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Steve Arnold Otieno | Full Stack Engineer",
  description: "Portfolio of Steve Arnold Otieno, a Full Stack Software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> 
      <body className={`${inter.className} pt-16`}> 
        <Header /> 
        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}