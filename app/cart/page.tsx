'use client';

import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, totalAmount, removeProduct, updateQuantity } = useCart();

  return (
    <section>
      <h1>Kundvagn</h1>

      {items.length === 0 ? (
        <p>Din kundvagn är tom.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <h2>{item.name}</h2>
                <p>
                  Pris: {item.price} kr × {item.quantity}
                </p>
                <label htmlFor={`quantity-${item.id}`}>Antal</label>{' '}
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.id, Number(event.target.value))
                  }
                />
                <button type="button" onClick={() => removeProduct(item.id)}>
                  Ta bort produkt
                </button>
              </li>
            ))}
          </ul>

          <p>
            <strong>Totalsumma: {totalAmount} kr</strong>
          </p>
        </>
      )}
    </section>
  );
}
