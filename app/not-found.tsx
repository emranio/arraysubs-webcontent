import React from 'react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found__inner">
          <span className="not-found__label">404 error</span>
          <h1 className="not-found__title">This page took a wrong turn.</h1>
          <p className="not-found__description">
            The page you&apos;re looking for doesn&apos;t exist, was moved, or the link is just being dramatic.
          </p>
          <div className="not-found__actions">
            <Button href="/" size="lg">
              Go back home
            </Button>
            <Button href="/articles/" variant="outline" size="lg">
              Read the blog
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}