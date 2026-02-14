export default function Loading() {
  return (
    <section className="page-grid" aria-live="polite" aria-busy="true">
      <div className="surface-card" style={{ padding: '1.5rem' }}>
        <div className="skeleton" style={{ height: '14px', width: '120px', marginBottom: '1rem' }} />
        <div className="skeleton" style={{ height: '36px', width: '60%', marginBottom: '0.7rem' }} />
        <div className="skeleton" style={{ height: '16px', width: '82%' }} />
      </div>
    </section>
  );
}
