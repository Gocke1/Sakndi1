'use client';

import { useState } from 'react';

type ProductImageGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section className="space-y-4" aria-label="Bildgalleri">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        <img
          src={activeImage}
          alt={`${productName} - huvudbild`}
          className="h-[420px] w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => {
          const isActive = image === activeImage;

          return (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`overflow-hidden rounded-lg border transition ${
                isActive
                  ? 'border-slate-900 ring-2 ring-slate-900/15'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
              aria-label={`Visa bild ${index + 1}`}
            >
              <img
                src={image}
                alt={`${productName} - miniatyr ${index + 1}`}
                className="h-24 w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
