'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const highlights = [
  { title: 'Nordisk kuratering', text: 'Varje plagg väljs med fokus på kvalitet, passform och hållbar känsla.' },
  { title: 'Snabb leverans', text: 'Beställningar före 15:00 skickas samma dag från vårt lager i Malmö.' },
  { title: 'Premium service', text: 'Personlig support med stilråd och smidig returhantering.' },
];

export default function HomePage() {
  return (
    <section className="page-grid">
      <motion.article
        className="surface-card"
        style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.65, 0.2, 1] }}
      >
        <p className="kicker">Ny säsong</p>
        <h1 className="title">Zalando möter nordisk minimalism.</h1>
        <p className="text-soft" style={{ maxWidth: '64ch' }}>
          En premiumupplevelse med subtil rörelse, lugn layout och tydlig typografi.
          Utforska handplockade produkter och en shoppingresa som känns mjuk i varje steg.
        </p>
        <div className="cta-row">
          <Link href="/products" className="button button-primary">
            Utforska kollektionen
          </Link>
          <Link href="/contact" className="button button-secondary">
            Prata med stylist
          </Link>
        </div>
      </motion.article>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {highlights.map((item, index) => (
          <motion.article
            key={item.title}
            className="surface-card"
            style={{ padding: '1.25rem' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.35 }}
            whileHover={{ y: -4 }}
          >
            <h2 style={{ marginTop: 0, marginBottom: '0.45rem', fontSize: '1.1rem' }}>{item.title}</h2>
            <p className="text-soft" style={{ margin: 0, fontSize: '0.94rem' }}>
              {item.text}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
