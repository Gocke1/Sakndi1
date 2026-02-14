import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(196,166,122,0.18),transparent_40%),radial-gradient(circle_at_bottom,rgba(35,35,35,0.14),transparent_45%)]" />

      <div className="mx-auto flex min-h-[65vh] w-full max-w-5xl flex-col items-center justify-center gap-10 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/60 px-6 py-3 shadow-sm backdrop-blur-sm">
          <span className="h-3 w-3 rounded-full bg-neutral-900" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.36em] text-neutral-700 sm:text-sm">
            Skandioutlet
          </span>
        </div>

        <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-7xl lg:text-8xl">
          Smartare Shopping. Bättre Priser.
        </h1>

        <Link
          href="/products"
          className="rounded-full bg-neutral-950 px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
        >
          Handla Nu
        </Link>
      </div>
    </section>
  );
}
