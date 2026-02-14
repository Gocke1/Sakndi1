import Link from 'next/link';
import { stripe } from '@/lib/stripe';

type SuccessPageProps = {
  searchParams?: {
    session_id?: string;
  };
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const sessionId = searchParams?.session_id;
  let customerEmail: string | null = null;

  if (stripe && sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      customerEmail = session.customer_details?.email ?? null;
    } catch {
      customerEmail = null;
    }
  }

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Tack för ditt köp!</h1>
      <p className="text-slate-700">
        Din betalning är registrerad och ordern behandlas.
      </p>
      {customerEmail ? (
        <p className="text-slate-700">Kvitto skickas till: {customerEmail}</p>
      ) : null}
      <div className="flex gap-3">
        <Link href="/products" className="rounded bg-slate-900 px-4 py-2 text-white">
          Till produkter
        </Link>
        <Link href="/" className="rounded border border-slate-300 px-4 py-2">
          Till startsidan
        </Link>
      </div>
    </section>
  );
}
