import { NextResponse } from 'next/server';
import { sanityConfigErrors, sanityWriteClient } from '@/lib/sanity';
import { normalizeSlug, validateProductPayload } from '@/lib/products';

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
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

  const updated = await sanityWriteClient
    .patch(params.id)
    .set({
      name: payload.name,
      slug: {
          current: payload.slug,
      },
      description: payload.description,
      price: payload.price,
      stock: payload.stock,
      isActive: payload.isActive,
    })
    .commit();

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  if (sanityConfigErrors.missingProjectConfig || sanityConfigErrors.missingWriteToken || !sanityWriteClient) {
    return NextResponse.json(
      { error: 'Sanity write-konfiguration saknas. Kontrollera SANITY_API_TOKEN.' },
      { status: 500 },
    );
  }

  await sanityWriteClient.delete(params.id);
  return NextResponse.json({ ok: true });
}
