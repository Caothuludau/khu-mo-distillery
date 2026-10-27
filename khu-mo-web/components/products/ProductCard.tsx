import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { format, getDictionary, type Locale } from "@/lib/i18n";
import {
  formatPrice,
  formatVolume,
  lowestPrice,
  productPackagings,
  productVolumes,
  text,
  type Product,
} from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  locale: Locale;
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function ProductCard({ product, locale, headingLevel: Heading = "h3", className }: ProductCardProps) {
  const t = getDictionary(locale);
  const volumes = productVolumes(product);
  const price = lowestPrice(product);
  const href = `/${locale}/products/${product.slug}`;

  const specs = [
    volumes.length ? volumes.map((ml) => formatVolume(ml, locale)).join(" / ") : `${t.products.volume}: ${t.common.updating.toLowerCase()}`,
    productPackagings(product)
      .map((key) => t.products.packaging[key])
      .join(", "),
  ];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-lg focus-within:ring-2 focus-within:ring-accent",
        className,
      )}
    >
      <div className="relative">
        <ProductImage
          product={product}
          locale={locale}
          sizes="(min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw"
          className="aspect-[4/5] rounded-none"
          imageClassName="transition duration-700 group-hover:scale-[1.04]"
        />
        {product.available ? null : (
          <Badge tone="warning" className="absolute left-3 top-3">
            {t.products.unavailable}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-highlight">
          {t.products.categories[product.category]}
        </p>
        <Heading className="mt-2 text-xl font-semibold leading-snug text-heading">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {text(product.name, locale)}
          </Link>
        </Heading>
        <p className="mt-2 text-sm text-muted">{specs.join(" · ")}</p>
        <p className="mt-3 text-base font-semibold text-foreground">
          {price === null ? t.products.contactForQuote : format(t.products.fromPrice, { price: formatPrice(price, locale) })}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[15px] font-semibold text-heading">
          {t.common.viewDetails}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-line bg-surface" aria-hidden>
      <div className="aspect-[4/5] animate-pulse bg-surface-muted" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 animate-pulse rounded-sm bg-surface-muted" />
        <div className="h-5 w-2/3 animate-pulse rounded-sm bg-surface-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded-sm bg-surface-muted" />
        <div className="h-4 w-2/5 animate-pulse rounded-sm bg-surface-muted" />
      </div>
    </div>
  );
}
