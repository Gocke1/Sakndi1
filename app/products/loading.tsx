export default function ProductsLoading() {
  return (
    <section className="page-grid" aria-live="polite" aria-busy="true">
      <div className="surface-card" style={{ padding: '1.5rem' }}>
        <div className="skeleton" style={{ height: '14px', width: '90px', marginBottom: '1rem' }} />
        <div className="skeleton" style={{ height: '34px', width: '46%' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <article key={i} className="surface-card" style={{ padding: '1rem' }}>
            <div className="skeleton" style={{ height: '170px', marginBottom: '0.9rem' }} />
            <div className="skeleton" style={{ height: '10px', width: '35%', marginBottom: '0.5rem' }} />
            <div className="skeleton" style={{ height: '16px', width: '70%', marginBottom: '0.4rem' }} />
            <div className="skeleton" style={{ height: '15px', width: '30%' }} />
          </article>
        ))}
      </div>
    </section>
  );
}
