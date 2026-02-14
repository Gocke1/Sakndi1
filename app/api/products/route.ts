import { NextResponse } from 'next/server';
import { getProducts, sanityConfigErrors, sanityWriteClient } from '@/lib/sanity';
import { normalizeSlug, validateProductPayload } from '@/lib/products';

export async function GET() {
  if (sanityConfigErrors.missingProjectConfig) {
    return NextResponse.json(
      { error: 'Sanity-konfiguration saknas. Kontrollera miljövariablerna.' },
      { status: 500 },
    );
  }

  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  if (sanityConfigErrors.missingProjectConfig || sanityConfigErrors.missingWriteToken || !sanityWriteClient) {
    return NextResponse.json(
      { error: 'Sanity write-konfiguration saknas. Kontrollera SANITY_API_TOKEN.' },
      { status: 500 },
    );
  }

  const body = (await req.json()) as {
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    stock?: number;
    isActive?: boolean;
  };

  const payload = {
    name: body.name?.trim() ?? '',
    slug: normalizeSlug(body.slug ?? body.name ?? ''),
    description: body.description?.trim() ?? '',
    price: Number(body.price),
    stock: Number(body.stock),
    isActive: body.isActive ?? true,
  };

  const validationError = validateProductPayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const created = await sanityWriteClient.create({
    name: payload.name,
    slug: {
      current: payload.slug,
    },
    description: payload.description,
    price: payload.price,
    stock: payload.stock,
    isActive: payload.isActive,
  });

  return NextResponse.json(created, { status: 201 });
}
