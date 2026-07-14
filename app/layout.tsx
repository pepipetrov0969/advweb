import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} - Адвокатска кантора в Монтана`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: site.name,
    title: `${site.name} - Адвокатска кантора в Монтана`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a
          href="#sadarzhanie"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-coffee focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Към съдържанието
        </a>
        <Header />
        <main id="sadarzhanie">{children}</main>
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
