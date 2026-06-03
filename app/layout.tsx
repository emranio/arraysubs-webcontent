import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { CustomCursor } from "@/components/animation/CustomCursor";
import { ScrollBackground } from "@/components/animation/ScrollBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteColors } from "@/lib/colors";

const fontDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  display: "swap",
});

const fontSans = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-funnel-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.defaultTitle, template: site.titleTemplate },
  description: site.description,
  applicationName: site.brand,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: site.favicon, type: "image/webp" }],
    shortcut: [{ url: site.favicon, type: "image/webp" }],
  },
  openGraph: {
    type: "website",
    siteName: site.brand,
    locale: site.locale,
    url: site.url,
    title: site.defaultTitle,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.brand }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.description,
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteColors.background,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={site.lang}
      className={`${fontDisplay.variable} ${fontSans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only rounded-md focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-dark focus:px-4 focus:py-2 focus:text-on-dark"
        >
          Skip to content
        </a>

        <CustomCursor />
        <ScrollBackground />

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
