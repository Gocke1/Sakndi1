import Link from 'next/link';
import { formatPrice, products } from '@/lib/products';

export default function ProductsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-semibold text-slate-900">Produkter</h1>
      <p className="text-slate-700">Utforska vårt sortiment och klicka in på en produkt för detaljer.</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-400 hover:shadow-sm"
          >
            <img src={product.images[0]} alt={product.name} className="mb-3 h-48 w-full rounded-lg object-cover" />
            <h2 className="text-lg font-medium text-slate-900">{product.name}</h2>
            <p className="mt-1 text-slate-600">{formatPrice(product.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
