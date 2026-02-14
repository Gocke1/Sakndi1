export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  unitAmount: number;
  currency: 'sek';
};

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'wool-scarf',
    name: 'Ullhalsduk',
    description: 'Varm halsduk i merinoull för kalla dagar.',
    unitAmount: 49900,
    currency: 'sek',
  },
  {
    id: 'leather-gloves',
    name: 'Läderhandskar',
    description: 'Mjuka handskar med fleecefoder.',
    unitAmount: 69900,
    currency: 'sek',
  },
  {
    id: 'winter-beanie',
    name: 'Vintermössa',
    description: 'Stickad mössa i återvunnen ullblandning.',
    unitAmount: 29900,
    currency: 'sek',
  },
];

export const CATALOG_BY_ID = new Map(
  CATALOG_PRODUCTS.map((product) => [product.id, product]),
);
