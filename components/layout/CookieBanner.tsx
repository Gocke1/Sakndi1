'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'skandioutlet_cookie_consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = window.localStorage.getItem(CONSENT_KEY);
    if (!hasConsent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-samtycke"
      className="cookie-banner"
    >
      <p>
        Vi använder cookies för att förbättra upplevelsen, analysera trafik och
        erbjuda relevant innehåll enligt GDPR. Genom att fortsätta godkänner du
        vår användning av cookies.
      </p>
      <div className="cookie-banner__actions">
        <Link href="/contact" className="cookie-banner__link">
          Läs mer
        </Link>
        <button type="button" onClick={acceptCookies}>
          Jag accepterar
        </button>
      </div>
    </aside>
  );
}
