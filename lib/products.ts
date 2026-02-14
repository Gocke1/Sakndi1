export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  specifications: ProductSpecification[];
  images: string[];
  relatedSlugs: string[];
};

export const products: Product[] = [
  {
    slug: 'fjalljacka-nord',
    name: 'Fjälljacka Nord',
    price: 1899,
    inStock: true,
    stockCount: 12,
    description:
      'En slitstark och vädertålig jacka för vandring och vardagsbruk i nordiskt klimat. Designad med hög krage och ventilationsdragkedjor för maximal komfort.',
    specifications: [
      { label: 'Material', value: '65% återvunnen polyester, 35% bomull' },
      { label: 'Vattentäthet', value: '10 000 mm' },
      { label: 'Passform', value: 'Regular fit' },
      { label: 'Foder', value: 'Lätt isolering' },
    ],
    images: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedSlugs: ['ulltroja-aren', 'vandringsbyxa-skog'],
  },
  {
    slug: 'ulltroja-aren',
    name: 'Ulltröja Åren',
    price: 999,
    inStock: true,
    stockCount: 27,
    description:
      'Mjuk och värmande ulltröja med klassisk skandinavisk stickning. Perfekt som mellanlager under kalla dagar eller som huvudplagg inomhus.',
    specifications: [
      { label: 'Material', value: '100% merinoull' },
      { label: 'Tvättråd', value: 'Handtvätt 30°' },
      { label: 'Passform', value: 'Slim fit' },
      { label: 'Vikt', value: '420 g' },
    ],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedSlugs: ['fjalljacka-nord', 'vandringsbyxa-skog'],
  },
  {
    slug: 'vandringsbyxa-skog',
    name: 'Vandringsbyxa Skog',
    price: 1299,
    inStock: false,
    stockCount: 0,
    description:
      'Teknisk byxa med stretchpaneler och förstärkta knän för långa turer. Integrerad ventilation och snabbtorkande tyg gör den idealisk för varierande väder.',
    specifications: [
      { label: 'Material', value: 'Nylon med 4-vägsstretch' },
      { label: 'Vikt', value: '510 g' },
      { label: 'Midja', value: 'Justerbar med kardborre' },
      { label: 'Fickor', value: '4 st med dragkedja' },
    ],
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618886487325-f665032b6352?auto=format&fit=crop&w=1200&q=80',
    ],
    relatedSlugs: ['fjalljacka-nord', 'ulltroja-aren'],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slugs: string[]) {
  return products.filter((product) => slugs.includes(product.slug));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(price);
}
