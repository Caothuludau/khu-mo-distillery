"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/components/products/ProductImage";
import { format, getDictionary, type Locale } from "@/lib/i18n";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  product: Product;
  locale: Locale;
};

export function ProductGallery({ product, locale }: ProductGalleryProps) {
  const t = getDictionary(locale);
  const [active, setActive] = useState(0);

  return (
    <div>
      <ProductImage
        product={product}
        locale={locale}
        index={active}
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="aspect-[4/5] border border-line"
      />
      {product.images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {product.images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                aria-label={format(t.products.showImage, { n: index + 1 })}
                aria-current={index === active ? "true" : undefined}
                onClick={() => setActive(index)}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-sm border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  index === active ? "border-gold" : "border-transparent opacity-75 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
