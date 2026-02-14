'use client';

import { motion } from 'framer-motion';

const products = [
  { name: 'Wool Blend Coat', category: 'Outerwear', price: '2 490 kr' },
  { name: 'Structured Knit', category: 'Stickat', price: '1 190 kr' },
  { name: 'Tapered Wool Trousers', category: 'Byxor', price: '1 490 kr' },
  { name: 'Leather Derby', category: 'Skor', price: '2 090 kr' },
];

export default function ProductsPage() {
  return (
    <section className="page-grid">
      <article className="surface-card" style={{ padding: '1.5rem' }}>
        <p className="kicker">Produkter</p>
        <h1 className="title" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.2rem)' }}>
          Kuraterad premiumkollektion
        </h1>
      </article>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {products.map((product, index) => (
          <motion.article
            key={product.name}
            className="surface-card"
            style={{ padding: '1rem', display: 'grid', gap: '0.6rem' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -3 }}
          >
            <div className="skeleton" style={{ height: '170px', borderRadius: '0.95rem', opacity: 0.45 }} />
            <p className="text-soft" style={{ margin: 0, fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {product.category}
            </p>
            <h2 style={{ margin: 0, fontSize: '1rem' }}>{product.name}</h2>
            <p style={{ margin: 0, fontWeight: 600 }}>{product.price}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
