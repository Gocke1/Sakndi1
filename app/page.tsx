import { Card } from '@/components/ui/Card';

const featuredProducts = [
  {
    id: 'aurora-wool-coat',
    name: 'Aurora Wool Coat',
    category: 'Dam · Ytterplagg',
    price: '2 499 kr',
    color: 'Sand',
  },
  {
    id: 'fjord-knit-sweater',
    name: 'Fjord Knit Sweater',
    category: 'Herr · Stickat',
    price: '1 199 kr',
    color: 'Dimblå',
  },
  {
    id: 'nordic-leather-boots',
    name: 'Nordic Leather Boots',
    category: 'Unisex · Skor',
    price: '1 899 kr',
    color: 'Mörk espresso',
  },
  {
    id: 'lumen-tote-bag',
    name: 'Lumen Tote Bag',
    category: 'Accessoarer',
    price: '899 kr',
    color: 'Ljusgrå',
  },
];

export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">Utvalda produkter</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Zalando möter nordisk minimalism
        </h1>
        <p className="mt-4 text-base text-neutral-600">
          Säsongens favoriter i en kuraterad kollektion med rena linjer, dämpade toner och modern
          premium-känsla.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="group flex flex-col gap-4 p-0">
            <div className="aspect-[4/5] rounded-t-2xl bg-neutral-100" />
            <div className="space-y-2 px-4 pb-5">
              <p className="text-xs uppercase tracking-wider text-neutral-500">{product.category}</p>
              <h2 className="text-lg font-medium text-neutral-900">{product.name}</h2>
              <p className="text-sm text-neutral-600">Färg: {product.color}</p>
              <p className="pt-1 text-base font-semibold text-neutral-900">{product.price}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
