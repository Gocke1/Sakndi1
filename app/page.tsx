import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: 'Startsida',
    description:
      'Välkommen till Skandioutlet – handla populära produkter för hem och livsstil till outletpriser.',
    path: '/',
    keywords: ['startsida', 'outletpriser', 'skandioutlet'],
  });
}

export default function HomePage() {
  return (
    <section>
      <h1>Skandioutlet</h1>
      <p>Startsida under uppbyggnad.</p>
    </section>
  );
}
