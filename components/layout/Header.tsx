'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Start' },
  { href: '/products', label: 'Produkter' },
  { href: '/contact', label: 'Kontakt' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex w-full max-w-7xl items-center px-6 py-5 md:px-10"
        aria-label="Huvudnavigation"
      >
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.2em] text-neutral-900 transition-colors duration-200 hover:text-neutral-600"
        >
          SKANDI
        </Link>

        <ul className="mx-auto hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-neutral-700 transition-all duration-200 hover:text-neutral-900 hover:tracking-wide"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/cart"
            className="rounded-full p-2 text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Kundvagn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H7" />
              <circle cx="10" cy="20" r="1.25" />
              <circle cx="17" cy="20" r="1.25" />
            </svg>
          </Link>

          <button
            type="button"
            className="rounded-full p-2 text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Öppna meny"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              {isMenuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-neutral-200 bg-white md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
