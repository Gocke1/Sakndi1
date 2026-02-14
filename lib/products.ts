export type ProductPayload = {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  isActive: boolean;
};

export function normalizeSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9åäö\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function validateProductPayload(payload: Partial<ProductPayload>): string | null {
  if (!payload.name?.trim()) {
    return 'Produktnamn är obligatoriskt.';
  }

  if (!payload.slug?.trim()) {
    return 'Slug är obligatorisk.';
  }

  if (payload.price == null || Number.isNaN(payload.price) || payload.price < 0) {
    return 'Pris måste vara ett positivt tal.';
  }

  if (payload.stock == null || Number.isNaN(payload.stock) || payload.stock < 0) {
    return 'Lager måste vara 0 eller större.';
  }

  return null;
}
