export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  stock: number;
  category: string;
  createdAt: string;
};
