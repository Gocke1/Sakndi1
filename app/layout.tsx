import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Skandioutlet',
  description: 'Modern e-handelsplattform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="shell">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
