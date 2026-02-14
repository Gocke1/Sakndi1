'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CartPage() {
  return (
    <section className="page-grid">
      <motion.article
        className="surface-card"
        style={{ padding: '1.6rem', maxWidth: '760px' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="kicker">Kundvagn</p>
        <h1 className="title" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}>Din kundvagn är tom</h1>
        <p className="text-soft">Lägg till utvalda favoriter för att fortsätta till en snabb, friktionsfri checkout.</p>
        <div className="cta-row">
          <Link className="button button-primary" href="/products">
            Fortsätt handla
          </Link>
        </div>
      </motion.article>
    </section>
  );
}
