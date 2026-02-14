'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <section className="page-grid">
      <motion.article
        className="surface-card"
        style={{ padding: '1.5rem', maxWidth: '700px' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="kicker">Kontakt</p>
        <h1 className="title" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}>
          Personlig service, utan väntetid
        </h1>
        <p className="text-soft">
          Våra stylister hjälper dig med storlek, passform och kompletta looks.
          Vi svarar normalt inom 20 minuter under öppettider.
        </p>
        <div className="cta-row">
          <a className="button button-primary" href="mailto:care@skandioutlet.com">
            care@skandioutlet.com
          </a>
        </div>
      </motion.article>
    </section>
  );
}
