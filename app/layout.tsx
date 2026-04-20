import { Suspense } from 'react';
import type { Metadata } from 'next';
import { GoogleTagManagerTracker } from '@/components/analytics/google-tag-manager';
import { Funnel_Display, Funnel_Sans } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import siteConfig from '@/site.config.json';
import '@/styles/globals.scss';

const bodyFont = Funnel_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const headingFont = Funnel_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s — ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${headingFont.variable} ${bodyFont.variable}`}>
        {gtmId ? (
          <Suspense fallback={null}>
            <GoogleTagManagerTracker gtmId={gtmId} />
          </Suspense>
        ) : null}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
