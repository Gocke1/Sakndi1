import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Produkter',
    description:
      'Utforska vårt sortiment av utvalda produkter med skandinavisk känsla och snabb leverans i Sverige.',
    path: '/products',
    keywords: ['produkter', 'sortiment', 'skandinavisk e-handel'],
  });
}

export default function ProductsPage() {
  return (
    <section>
      <h1>Produkter</h1>
      <p>Produktsidan är en placeholder.</p>
    </section>
  );
}
