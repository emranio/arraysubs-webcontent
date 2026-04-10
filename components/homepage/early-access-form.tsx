'use client';

import React, { useState, type FormEvent } from 'react';

export function EarlyAccessForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="early-access-form__success">
        <p>Thank you! We&apos;ll send your Pro license key shortly.</p>
      </div>
    );
  }

  return (
    <form className="early-access-form" onSubmit={handleSubmit}>
      <div className="early-access-form__field">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="early-access-form__input"
          aria-label="Email address"
        />
        <button type="submit" className="early-access-form__button btn btn--primary btn--lg">
          Claim My Free Pro License
        </button>
      </div>
      <p className="early-access-form__micro">
        We&apos;ll send your license key immediately. No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
