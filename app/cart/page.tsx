import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Kundvagn',
    description:
      'Granska din kundvagn och slutför ditt köp tryggt hos Skandioutlet.',
    path: '/cart',
    keywords: ['kundvagn', 'checkout', 'säker betalning'],
  });
}

export default function CartPage() {
  return (
    <section>
      <h1>Kundvagn</h1>
      <p>Kundvagnen är en placeholder.</p>
    </section>
  );
}
