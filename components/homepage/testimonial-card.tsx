import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  context: string;
}

export function TestimonialCard({ quote, name, context }: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      <blockquote className="testimonial-card__quote">{quote}</blockquote>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar" />
        <div>
          <p className="testimonial-card__name">{name}</p>
          <p className="testimonial-card__context">{context}</p>
        </div>
      </div>
    </div>
  );
}
