import { formatPrice, type Product } from '@/lib/products';

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <section className="space-y-6" aria-label="Produktinformation">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
        <p className="text-2xl font-bold text-slate-900">{formatPrice(product.price)}</p>
        <p className={product.inStock ? 'text-emerald-700' : 'text-rose-700'}>
          {product.inStock
            ? `I lager (${product.stockCount} st tillgängliga)`
            : 'Tillfälligt slut i lager'}
        </p>
      </header>

      <button
        type="button"
        disabled={!product.inStock}
        className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Lägg i kundvagn
      </button>

      <article className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Beskrivning</h2>
        <p className="leading-relaxed text-slate-700">{product.description}</p>
      </article>
    </section>
  );
}
