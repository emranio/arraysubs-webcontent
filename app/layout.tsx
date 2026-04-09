import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import siteConfig from '@/site.config.json';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s — ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
