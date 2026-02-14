import Link from 'next/link';
import { formatPrice, type Product } from '@/lib/products';

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4" aria-label="Relaterade produkter">
      <h2 className="text-xl font-semibold text-slate-900">Relaterade produkter</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-400 hover:shadow-sm"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="mb-3 h-40 w-full rounded-lg object-cover"
            />
            <h3 className="font-medium text-slate-900">{product.name}</h3>
            <p className="mt-1 text-slate-600">{formatPrice(product.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
