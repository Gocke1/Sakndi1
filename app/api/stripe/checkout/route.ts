import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { CATALOG_BY_ID } from '@/lib/catalog';

export const runtime = 'nodejs';

type CheckoutRequestBody = {
  items?: Array<{
    productId?: unknown;
    quantity?: unknown;
  }>;
};

function getBaseUrl(request: Request): string | null {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configuredBaseUrl) {
    try {
      return new URL(configuredBaseUrl).origin;
    } catch {
      return null;
    }
  }

  const origin = request.headers.get('origin');
  if (!origin) {
    return null;
  }

  try {
    const parsedOrigin = new URL(origin);
    if (!['http:', 'https:'].includes(parsedOrigin.protocol)) {
      return null;
    }

    return parsedOrigin.origin;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { message: 'Stripe is not configured yet.' },
      { status: 503 },
    );
  }

  let body: CheckoutRequestBody;
  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
  }

  const items = body.items;
  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return NextResponse.json(
      { message: 'Items must be a non-empty array with max 20 entries.' },
      { status: 400 },
    );
  }

  const quantitiesByProductId = new Map<string, number>();

  for (const item of items) {
    if (typeof item.productId !== 'string') {
      return NextResponse.json(
        { message: 'Each item requires a valid productId.' },
        { status: 400 },
      );
    }

    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return NextResponse.json(
        { message: 'Each item requires an integer quantity between 1 and 10.' },
        { status: 400 },
      );
    }

    const current = quantitiesByProductId.get(item.productId) ?? 0;
    const nextQuantity = current + quantity;

    if (nextQuantity > 10) {
      return NextResponse.json(
        { message: `Total quantity for ${item.productId} exceeds limit.` },
        { status: 400 },
      );
    }

    quantitiesByProductId.set(item.productId, nextQuantity);
  }

  const lineItems: Array<{
    price_data: {
      currency: 'sek';
      product_data: {
        name: string;
        description: string;
      };
      unit_amount: number;
    };
    quantity: number;
  }> = [];

  for (const [productId, quantity] of quantitiesByProductId.entries()) {
    const product = CATALOG_BY_ID.get(productId);
    if (!product) {
      return NextResponse.json(
        { message: `Unknown productId: ${productId}` },
        { status: 400 },
      );
    }

    lineItems.push({
      price_data: {
        currency: product.currency,
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.unitAmount,
      },
      quantity,
    });
  }

  const baseUrl = getBaseUrl(request);
  if (!baseUrl) {
    return NextResponse.json(
      { message: 'Could not determine app base URL for redirect.' },
      { status: 500 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { message: 'Stripe session did not return a redirect URL.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error);
    return NextResponse.json(
      { message: 'Failed to create Stripe checkout session.' },
      { status: 500 },
    );
  }
}
