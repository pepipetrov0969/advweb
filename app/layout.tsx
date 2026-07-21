import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";
import { MobileCtaBar } from "@/components/shared/MobileCtaBar";
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
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - Адвокатска кантора в Монтана`,
    description: site.description,
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${inter.variable} ${playfair.variable}`}>
      <body className="pb-16 sm:pb-0">
        <a
          href="#sadarzhanie"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-coffee focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Към съдържанието
        </a>
        <Header />
        <main id="sadarzhanie">{children}</main>
        <Footer />
        <FloatingContact />
        <MobileCtaBar />
        <JsonLd />
        <Analytics />
        <SpeedInsights />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18325005980"
          strategy="beforeInteractive"
        />
        <Script id="google-ads-gtag" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18325005980');
          `}
        </Script>
      </body>
    </html>
  );
}
