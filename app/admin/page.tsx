'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Product = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  isActive: boolean;
  updatedAt: string;
};

type FormState = {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  isActive: boolean;
};

const initialForm: FormState = {
  name: '',
  slug: '',
  description: '',
  price: '0',
  stock: '0',
  isActive: true,
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  async function loadProducts() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Kunde inte hämta produkter.');
      }

      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Okänt fel.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      isActive: form.isActive,
    };

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/api/products/${editingId}` : '/api/products';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Kunde inte spara produkten.');
      return;
    }

    setForm(initialForm);
    setEditingId(null);
    await loadProducts();
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Kunde inte radera produkt.');
      return;
    }

    if (editingId === id) {
      setEditingId(null);
      setForm(initialForm);
    }

    await loadProducts();
  }

  function startEdit(product: Product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description ?? '',
      price: String(product.price),
      stock: String(product.stock),
      isActive: product.isActive,
    });
  }

  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">Admin: Produkthantering</h1>

      <form onSubmit={onSubmit} className="grid gap-3 max-w-xl">
        <input
          className="border rounded p-2"
          placeholder="Namn"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <input
          className="border rounded p-2"
          placeholder="Slug (ex. tra-bord)"
          value={form.slug}
          onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
          required
        />
        <textarea
          className="border rounded p-2"
          placeholder="Beskrivning"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />
        <input
          className="border rounded p-2"
          placeholder="Pris"
          type="number"
          min={0}
          value={form.price}
          onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
          required
        />
        <input
          className="border rounded p-2"
          placeholder="Lager"
          type="number"
          min={0}
          value={form.stock}
          onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
          required
        />

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
          />
          Aktiv produkt
        </label>

        <div className="flex gap-2">
          <button type="submit" className="bg-black text-white rounded px-4 py-2">
            {isEditing ? 'Uppdatera produkt' : 'Skapa produkt'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="border rounded px-4 py-2"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
            >
              Avbryt
            </button>
          )}
        </div>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-3">
        <h2 className="text-xl font-medium">Produkter</h2>
        {loading && <p>Laddar produkter...</p>}
        {!loading && products.length === 0 && <p>Inga produkter hittades.</p>}

        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product._id} className="border rounded p-3 flex justify-between gap-4 items-start">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">Slug: {product.slug}</p>
                <p className="text-sm">Pris: {product.price} kr</p>
                <p className="text-sm">Lager: {product.stock}</p>
                <p className="text-xs text-gray-500">Senast uppdaterad: {new Date(product.updatedAt).toLocaleString('sv-SE')}</p>
              </div>
              <div className="flex gap-2">
                <button className="border rounded px-3 py-1" onClick={() => startEdit(product)}>
                  Redigera
                </button>
                <button className="border rounded px-3 py-1 text-red-600" onClick={() => void onDelete(product._id)}>
                  Radera
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
