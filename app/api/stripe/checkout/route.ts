import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST() {
  if (!stripe) {
    return NextResponse.json(
      { message: 'Stripe is not configured yet.' },
      { status: 503 },
    );
  }

  return NextResponse.json({ message: 'Checkout endpoint placeholder.' });
}
