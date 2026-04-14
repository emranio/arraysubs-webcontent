import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { APP_HOME_PATH } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'ArraySubs is getting a refreshed front door. The full product site is live under /arraysubs/.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <article className="page page--default">
      <Section background="light" fullWidth>
        <div className="page-hero container">
          <div className="page-hero__content">
            <p className="page-hero__subtitle">ArraySubs</p>
            <h1 className="page-hero__title">Coming soon.</h1>
            <p className="page-hero__subtitle">
              We&apos;re setting up a streamlined entry page right now. The full ArraySubs site is already live if you want the good stuff immediately.
            </p>
            <div className="page-hero__actions">
              <Button href={APP_HOME_PATH} size="lg">
                Visit ArraySubs
              </Button>
              <Button href="/contact/" variant="outline" size="lg">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </article>
  );
}
