'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/cart">Cart ({totalItems})</Link>
      </nav>
    </header>
  );
}
