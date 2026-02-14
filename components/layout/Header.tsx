'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: 'Hem' },
  { href: '/products', label: 'Produkter' },
  { href: '/contact', label: 'Kontakt' },
  { href: '/cart', label: 'Kundvagn' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        backdropFilter: 'blur(18px)',
        background: 'color-mix(in srgb, #f5f5f2 88%, white)',
        borderBottom: '1px solid rgba(18, 18, 18, 0.07)',
      }}
    >
      <nav
        style={{
          width: 'min(1120px, calc(100% - 3rem))',
          margin: '0 auto',
          minHeight: '4.3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <Link href="/" style={{ fontWeight: 600, letterSpacing: '0.03em' }}>
          Skandioutlet
        </Link>

        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  position: 'relative',
                  borderRadius: '999px',
                  padding: '0.42rem 0.78rem',
                  fontSize: '0.92rem',
                  color: isActive ? '#121212' : '#55554e',
                  transition: 'color 0.3s ease, background-color 0.3s ease',
                  background: isActive ? 'rgba(18,18,18,0.05)' : 'transparent',
                }}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '999px',
                      border: '1px solid rgba(18, 18, 18, 0.1)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
