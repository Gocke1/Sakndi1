export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(18, 18, 18, 0.07)',
        padding: '1.3rem 0',
      }}
    >
      <div
        style={{
          width: 'min(1120px, calc(100% - 3rem))',
          margin: '0 auto',
          color: '#55554e',
          fontSize: '0.87rem',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <p>© {new Date().getFullYear()} Skandioutlet</p>
        <p>Kuraterade varumärken · Fri retur inom 30 dagar</p>
      </div>
    </footer>
  );
}
