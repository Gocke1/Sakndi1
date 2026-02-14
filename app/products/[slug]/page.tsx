import { notFound } from 'next/navigation';
import {
  getProductBySlug,
  getRelatedProducts,
  products,
  type Product,
} from '@/lib/products';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductSpecifications } from '@/components/product/ProductSpecifications';
import { RelatedProducts } from '@/components/product/RelatedProducts';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Produkt hittades inte | Skandioutlet',
    };
  }

  return {
    title: `${product.name} | Skandioutlet`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.relatedSlugs).filter(
    (relatedProduct: Product) => relatedProduct.slug !== product.slug,
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductImageGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>

      <ProductSpecifications specifications={product.specifications} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
