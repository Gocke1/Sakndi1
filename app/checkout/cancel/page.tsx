import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Betalningen avbröts</h1>
      <p className="text-slate-700">
        Ingen betalning har dragits. Du kan uppdatera kundvagnen och försöka igen.
      </p>
      <div className="flex gap-3">
        <Link href="/cart" className="rounded bg-slate-900 px-4 py-2 text-white">
          Till kundvagn
        </Link>
        <Link href="/products" className="rounded border border-slate-300 px-4 py-2">
          Till produkter
        </Link>
      </div>
    </section>
  );
}
