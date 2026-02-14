import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <article
      className={`rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md ${className}`}
    >
      {children}
    </article>
  );
}
