import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export type SanityProduct = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  isActive: boolean;
  updatedAt: string;
};

const storagePath = path.join(process.cwd(), 'data', 'products.json');

async function ensureStorage() {
  const dir = path.dirname(storagePath);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(storagePath);
  } catch {
    await fs.writeFile(storagePath, '[]', 'utf8');
  }
}

async function readProducts(): Promise<SanityProduct[]> {
  await ensureStorage();
  const raw = await fs.readFile(storagePath, 'utf8');

  try {
    return JSON.parse(raw) as SanityProduct[];
  } catch {
    return [];
  }
}

async function writeProducts(products: SanityProduct[]) {
  await ensureStorage();
  await fs.writeFile(storagePath, JSON.stringify(products, null, 2), 'utf8');
}

export const sanityConfigErrors = {
  missingProjectConfig: false,
  missingWriteToken: false,
};

export async function getProducts(): Promise<SanityProduct[]> {
  const products = await readProducts();
  return products.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export const sanityWriteClient = {
  async create(product: { name: string; slug: { current: string }; description?: string; price: number; stock: number; isActive: boolean }) {
    const products = await readProducts();
    const next: SanityProduct = {
      _id: crypto.randomUUID(),
      name: product.name,
      slug: product.slug.current,
      description: product.description,
      price: product.price,
      stock: product.stock,
      isActive: product.isActive,
      updatedAt: new Date().toISOString(),
    };

    products.push(next);
    await writeProducts(products);
    return next;
  },

  patch(id: string) {
    return {
      set(update: { name?: string; slug?: { current: string }; description?: string; price?: number; stock?: number; isActive?: boolean }) {
        return {
          async commit() {
            const products = await readProducts();
            const index = products.findIndex((item) => item._id === id);

            if (index === -1) {
              throw new Error('Produkten hittades inte.');
            }

            const current = products[index];
            const updated: SanityProduct = {
              ...current,
              ...update,
              slug: update.slug?.current ?? current.slug,
              updatedAt: new Date().toISOString(),
            };

            products[index] = updated;
            await writeProducts(products);
            return updated;
          },
        };
      },
    };
  },

  async delete(id: string) {
    const products = await readProducts();
    const filtered = products.filter((item) => item._id !== id);
    await writeProducts(filtered);
  },
};
