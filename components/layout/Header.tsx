import Link from 'next/link';

export function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}
