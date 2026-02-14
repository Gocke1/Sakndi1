import Link from 'next/link';
import { CATALOG_PRODUCTS } from '@/lib/catalog';

export default function ProductsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Produkter</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {CATALOG_PRODUCTS.map((product) => (
          <li key={product.id} className="rounded-lg border border-slate-200 p-4">
            <h2 className="font-medium">{product.name}</h2>
            <p className="text-sm text-slate-600">{product.description}</p>
            <p className="mt-2 text-sm font-medium">
              {(product.unitAmount / 100).toLocaleString('sv-SE', {
                style: 'currency',
                currency: 'SEK',
              })}
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/cart"
        className="inline-block rounded bg-slate-900 px-4 py-2 text-white"
      >
        Gå till kundvagn
      </Link>
    </section>
  );
}
