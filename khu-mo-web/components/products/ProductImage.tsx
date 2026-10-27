import Image from "next/image";
import { BrandMark } from "@/components/layout/BrandMark";
import { PALETTES } from "@/components/products/palette";
import { getDictionary, type Locale } from "@/lib/i18n";
import { text, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  product: Product;
  locale: Locale;
  sizes: string;
  /** Index into `product.images`. */
  index?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Small thumbnails skip the "photo coming soon" caption. */
  compact?: boolean;
};

/** Product photo, or a branded placeholder in the product's palette until real photos exist. */
export function ProductImage({
  product,
  locale,
  sizes,
  index = 0,
  priority,
  className,
  imageClassName,
  compact = false,
}: ProductImageProps) {
  const src = product.images[index];
  const name = text(product.name, locale);

  return (
    <div className={cn("relative overflow-hidden rounded-sm bg-surface-muted", className)}>
      {src ? (
        <Image src={src} alt={name} fill sizes={sizes} priority={priority} className={cn("object-cover", imageClassName)} />
      ) : (
        <div
          role="img"
          aria-label={`${name} — ${getDictionary(locale).products.imagePending}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-3 text-ivory"
          style={{ background: PALETTES[product.palette].gradient }}
        >
          <BrandMark className={compact ? "w-10/12" : "w-1/2 max-w-40"} />
          {compact ? null : (
            <p className="text-center text-[13px] font-medium text-ivory/85">
              {getDictionary(locale).products.imagePending}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
