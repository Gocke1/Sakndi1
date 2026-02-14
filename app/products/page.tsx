'use client';

import { useCart } from '@/context/CartContext';

const products = [
  { id: 'jacket-001', name: 'Vinterjacka', price: 1499 },
  { id: 'boots-001', name: 'Kängor', price: 999 },
  { id: 'beanie-001', name: 'Mössa', price: 249 },
];

export default function ProductsPage() {
  const { addProduct } = useCart();

  return (
    <section>
      <h1>Produkter</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price} kr</p>
            <button
              type="button"
              onClick={() => addProduct(product)}
              aria-label={`Lägg till ${product.name} i kundvagnen`}
            >
              Lägg till produkt
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
