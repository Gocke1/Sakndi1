import type { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "p-001",
    title: "Nordic Winter Parka",
    description:
      "Varm och vattenavvisande parkas med återvunnet foder, perfekt för kalla vinterdagar.",
    price: 1499,
    compareAtPrice: 1999,
    images: [
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521223344201-d169129f7b7a?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 18,
    category: "jackor",
    createdAt: "2026-01-10T08:15:00.000Z"
  },
  {
    id: "p-002",
    title: "Scandi Knit Sweater",
    description:
      "Mjuk stickad tröja i ullblandning med klassisk skandinavisk design.",
    price: 699,
    compareAtPrice: 899,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 42,
    category: "tröjor",
    createdAt: "2026-01-08T10:30:00.000Z"
  },
  {
    id: "p-003",
    title: "Minimalist Tote Bag",
    description:
      "Rymlig tygväska med förstärkta handtag för vardag och shopping.",
    price: 249,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 65,
    category: "accessoarer",
    createdAt: "2026-01-12T14:45:00.000Z"
  },
  {
    id: "p-004",
    title: "Essential Denim",
    description: "Stretchiga jeans med rak passform för en tidlös look.",
    price: 549,
    compareAtPrice: 749,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 27,
    category: "byxor",
    createdAt: "2026-01-11T09:05:00.000Z"
  }
];
