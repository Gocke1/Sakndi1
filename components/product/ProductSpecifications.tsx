import type { ProductSpecification } from '@/lib/products';

type ProductSpecificationsProps = {
  specifications: ProductSpecification[];
};

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6" aria-label="Specifikationer">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Specifikationer</h2>
      <dl className="space-y-3">
        {specifications.map((specification) => (
          <div key={specification.label} className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
            <dt className="font-medium text-slate-900">{specification.label}</dt>
            <dd className="text-slate-700">{specification.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
