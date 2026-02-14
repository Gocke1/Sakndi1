import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Kontakt',
    description:
      'Kontakta Skandioutlet för frågor om produkter, leverans eller beställningar.',
    path: '/contact',
    keywords: ['kontakt', 'kundservice', 'skandioutlet support'],
  });
}

export default function ContactPage() {
  return (
    <section>
      <h1>Kontakt</h1>
      <p>Kontaktsidan är en placeholder.</p>
    </section>
  );
}
