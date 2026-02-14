import { getProducts, sanityConfigErrors } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  if (sanityConfigErrors.missingProjectConfig) {
    return (
      <section>
        <h1>Produkter</h1>
        <p>Sanity är inte konfigurerat ännu. Lägg till miljövariabler för att visa produkter.</p>
      </section>
    );
  }

  const products = await getProducts();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Produkter</h1>

      {products.length === 0 && <p>Inga produkter publicerade.</p>}

      <ul className="grid gap-3">
        {products
          .filter((product) => product.isActive)
          .map((product) => (
            <li key={product._id} className="border rounded p-4">
              <h2 className="font-medium">{product.name}</h2>
              {product.description && <p className="text-sm text-gray-600">{product.description}</p>}
              <p className="text-sm">Pris: {product.price} kr</p>
              <p className="text-sm">I lager: {product.stock}</p>
            </li>
          ))}
      </ul>
    </section>
  );
}
