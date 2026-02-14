'use client';

import { useMemo, useState } from 'react';
import { CATALOG_PRODUCTS } from '@/lib/catalog';

type CartItemPayload = {
  productId: string;
  quantity: number;
};

export function CartCheckout() {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(CATALOG_PRODUCTS.map((product) => [product.id, 0])),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalAmount = useMemo(() => {
    return CATALOG_PRODUCTS.reduce((sum, product) => {
      return sum + product.unitAmount * (quantities[product.id] ?? 0);
    }, 0);
  }, [quantities]);

  const cartItems = useMemo<CartItemPayload[]>(() => {
    return CATALOG_PRODUCTS.flatMap((product) => {
      const quantity = quantities[product.id] ?? 0;
      return quantity > 0 ? [{ productId: product.id, quantity }] : [];
    });
  }, [quantities]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setErrorMessage('Lägg till minst en produkt i kundvagnen.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = (await response.json()) as {
        message?: string;
        url?: string;
      };

      if (!response.ok || !data.url) {
        setErrorMessage(
          data.message ?? 'Checkout kunde inte initieras. Försök igen.',
        );
        return;
      }

      window.location.assign(data.url);
    } catch {
      setErrorMessage('Nätverksfel vid checkout. Försök igen om en stund.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Kundvagn</h1>
      <p className="text-slate-600">Välj antal och gå vidare till Stripe Checkout.</p>

      <ul className="space-y-4">
        {CATALOG_PRODUCTS.map((product) => (
          <li key={product.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-medium">{product.name}</h2>
                <p className="text-sm text-slate-600">{product.description}</p>
                <p className="mt-1 text-sm font-medium">
                  {(product.unitAmount / 100).toLocaleString('sv-SE', {
                    style: 'currency',
                    currency: 'SEK',
                  })}
                </p>
              </div>
              <label className="text-sm">
                Antal
                <input
                  className="mt-1 block w-20 rounded border border-slate-300 px-2 py-1"
                  type="number"
                  min={0}
                  max={10}
                  value={quantities[product.id] ?? 0}
                  onChange={(event) => {
                    const nextValue = Number(event.target.value);
                    const sanitized = Number.isFinite(nextValue)
                      ? Math.max(0, Math.min(10, Math.floor(nextValue)))
                      : 0;
                    setQuantities((current) => ({
                      ...current,
                      [product.id]: sanitized,
                    }));
                  }}
                />
              </label>
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-lg bg-slate-50 p-4">
        <p className="font-medium">
          Totalt:{' '}
          {(totalAmount / 100).toLocaleString('sv-SE', {
            style: 'currency',
            currency: 'SEK',
          })}
        </p>
      </div>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
        className="rounded bg-slate-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Skickar...' : 'Fortsätt till Stripe'}
      </button>
    </section>
  );
}
