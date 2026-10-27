import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PALETTES } from "@/components/products/palette";
import { ProductImage } from "@/components/products/ProductImage";
import { buttonStyles } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getFilterOptions, products, text } from "@/lib/products";

type ProductLinesProps = {
  locale: Locale;
};

export function ProductLines({ locale }: ProductLinesProps) {
  const t = getDictionary(locale);
  const categories = getFilterOptions().category;

  return (
    <Section
      id="product-lines"
      eyebrow={t.home.productsEyebrow}
      title={t.home.productsTitle}
      intro={t.home.productsIntro}
      actions={
        <Link href={`/${locale}/products`} className={buttonStyles("secondary")}>
          {t.common.viewAll}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      }
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {products.map((product) => {
          const href = `/${locale}/products/${product.slug}`;
          return (
            <li key={product.slug}>
              <article className="group relative grid h-full overflow-hidden rounded-sm border border-line bg-surface transition hover:border-gold/60 hover:shadow-lg focus-within:ring-2 focus-within:ring-accent sm:grid-cols-[0.9fr_1fr]">
                <ProductImage
                  product={product}
                  locale={locale}
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 45vw, 100vw"
                  className="aspect-[4/5] rounded-none sm:aspect-auto sm:min-h-80"
                  imageClassName="transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="flex flex-col p-6">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-highlight">
                    {t.products.categories[product.category]}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-snug text-heading">
                    <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
                      {text(product.name, locale)}
                    </Link>
                  </h3>
                  <p className="mt-2 text-base text-muted">{text(product.tagline, locale)}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="flex -space-x-1" aria-hidden>
                      {PALETTES[product.palette].swatches.map((color) => (
                        <span
                          key={color}
                          className="size-5 rounded-full border border-line ring-2 ring-surface"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </span>
                    <span className="text-sm text-muted">
                      <span className="sr-only">{t.products.colors}: </span>
                      {text(product.colors, locale)}
                    </span>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-semibold text-heading">
                    {t.home.viewProduct}
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {categories.length > 1 ? (
        <nav aria-label={t.home.browseCategory} className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted">{t.home.browseCategory}:</span>
          {categories.map((key) => (
            <Link
              key={key}
              href={`/${locale}/products?category=${key}`}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-[15px] font-medium text-foreground transition hover:border-gold hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {t.products.categories[key]}
            </Link>
          ))}
        </nav>
      ) : null}
    </Section>
  );
}
