import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { person, seo, siteUrl } from "@/content/site";
import { isPlaceholder } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.home.title,
  description: seo.home.description,
  openGraph: { siteName: person.name, type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

// Runs before paint: applies a saved theme choice so there is no flash of the wrong theme.
// With no saved choice, tokens.css follows prefers-color-scheme.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: person.name,
  jobTitle: person.jobTitle,
  url: siteUrl,
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressLocality: person.city, addressCountry: person.country },
  sameAs: [person.links.github, person.links.linkedin, person.links.satechs].filter((u) => !isPlaceholder(u)),
  worksFor: [
    { "@type": "Organization", name: person.employer },
    {
      // schema.org puts `founder` on the Organization, pointing back at this Person.
      "@type": "Organization",
      name: person.company,
      founder: { "@id": `${siteUrl}/#person` },
      ...(isPlaceholder(person.links.satechs) ? {} : { url: person.links.satechs }),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh bg-paper text-ink">
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
