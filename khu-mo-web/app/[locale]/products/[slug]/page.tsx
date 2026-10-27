import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Users } from "lucide-react";
import { EnquiryButton } from "@/components/forms/EnquiryButton";
import { PALETTES } from "@/components/products/palette";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGallery } from "@/components/products/ProductGallery";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { format, getDictionary, getLocaleAlternates, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import {
  formatPrice,
  formatVolume,
  getProduct,
  lowestPrice,
  productPackagings,
  products,
  productVolumes,
  text,
  type Product,
} from "@/lib/products";
import { siteConfig, toTelHref } from "@/lib/site-config";

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug })));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!isLocale(locale) || !product) {
    return {};
  }
  return {
    title: text(product.name, locale),
    description: text(product.description, locale),
    alternates: getLocaleAlternates(locale, `/products/${slug}`),
    openGraph: product.images[0] ? { images: [product.images[0]] } : undefined,
  };
}

function Facts({ items }: { items: { label: string; value: string; pending?: boolean }[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3 sm:grid-cols-[11rem_1fr]">
          <dt className="text-[15px] text-muted">{item.label}</dt>
          <dd className={item.pending ? "text-[15px] italic text-muted" : "text-[15px] font-semibold text-foreground"}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function describeVariant(product: Product, index: number, locale: Locale) {
  const t = getDictionary(locale);
  const variant = product.variants[index];
  return {
    packaging: t.products.packaging[variant.packaging],
    volume: variant.volumeMl === null ? null : formatVolume(variant.volumeMl, locale),
    price: variant.price === null ? t.products.contactForQuote : formatPrice(variant.price, locale),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!isLocale(locale) || !product) {
    notFound();
  }
  const t = getDictionary(locale);
  const p = t.products;
  const name = text(product.name, locale);
  const volumes = productVolumes(product);
  const price = lowestPrice(product);
  const { phone } = siteConfig.company;
  const pending = t.common.updating;
  const related = products.filter((item) => item.slug !== product.slug);

  return (
    <main>
      <Container className="pt-6 md:pt-8">
        <Breadcrumb
          label={t.common.breadcrumb}
          items={[
            { label: t.common.home, href: `/${locale}` },
            { label: t.nav.products, href: `/${locale}/products` },
            { label: p.categories[product.category], href: `/${locale}/products?category=${product.category}` },
            { label: name },
          ]}
        />
      </Container>

      <Container className="grid gap-8 py-8 lg:grid-cols-2 lg:gap-14 lg:py-10">
        <ProductGallery product={product} locale={locale} />

        <div className="lg:pt-4">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-highlight">
            {p.categories[product.category]}
          </p>
          <h1 className="mt-3 text-[2rem] font-bold leading-tight text-heading sm:text-[2.375rem] lg:text-5xl">{name}</h1>
          <p className="mt-3 text-lg text-muted">{text(product.tagline, locale)}</p>
          <div className="mt-4">
            <Badge tone={product.available ? "default" : "warning"}>
              {product.available ? p.available : p.unavailable}
            </Badge>
          </div>

          <div className="mt-6">
            <Facts
              items={[
                {
                  label: p.volume,
                  value: volumes.length ? volumes.map((ml) => formatVolume(ml, locale)).join(" / ") : pending,
                  pending: !volumes.length,
                },
                {
                  label: p.packagingLabel,
                  value: productPackagings(product)
                    .map((key) => p.packaging[key])
                    .join(", "),
                },
                {
                  label: p.abv,
                  value: product.abv === null ? pending : `${product.abv}% vol`,
                  pending: product.abv === null,
                },
                {
                  label: p.price,
                  value: price === null ? p.contactForQuote : format(p.fromPrice, { price: formatPrice(price, locale) }),
                },
              ]}
            />
          </div>

          <section aria-labelledby="buy-title" className="mt-8 rounded-sm border border-line bg-surface p-5 md:p-6">
            <h2 id="buy-title" className="text-lg font-semibold text-heading">
              {p.buyTitle}
            </h2>
            {product.available ? null : <p className="mt-2 text-[15px] leading-6 text-danger">{p.unavailableNote}</p>}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <EnquiryButton interest="purchase" productSlug={product.slug}>
                {p.enquire}
              </EnquiryButton>
              {phone ? (
                <a href={toTelHref(phone)} className={buttonStyles("secondary")}>
                  <Phone className="size-4" aria-hidden />
                  {format(p.call, { phone })}
                </a>
              ) : null}
              <Link href={`/${locale}/where-to-buy`} className={buttonStyles("secondary")}>
                <MapPin className="size-4" aria-hidden />
                {p.seePoints}
              </Link>
            </div>
          </section>
        </div>
      </Container>

      <Container className="grid gap-10 border-t border-line py-10 md:py-14 lg:grid-cols-2 lg:gap-14">
        <section aria-labelledby="info-title">
          <h2 id="info-title" className="text-[1.75rem] font-bold text-heading md:text-3xl">
            {p.info}
          </h2>
          <p className="mt-4 max-w-prose text-base leading-7 md:text-[17px]">{text(product.description, locale)}</p>
          <div className="mt-6">
            <Facts
              items={[
                {
                  label: p.ingredients,
                  value: text(product.ingredients, locale) ?? pending,
                  pending: !product.ingredients,
                },
                { label: p.origin, value: text(product.origin, locale) ?? pending, pending: !product.origin },
                { label: p.colors, value: text(product.colors, locale) },
              ]}
            />
          </div>
          <div className="mt-4 flex gap-2" aria-hidden>
            {PALETTES[product.palette].swatches.map((color) => (
              <span key={color} className="size-6 rounded-full border border-line" style={{ backgroundColor: color }} />
            ))}
          </div>
        </section>

        <section aria-labelledby="packaging-title">
          <h2 id="packaging-title" className="text-[1.75rem] font-bold text-heading md:text-3xl">
            {p.packagingTitle}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {product.variants.map((_, index) => {
              const variant = describeVariant(product, index, locale);
              return (
                <li key={index} className="rounded-sm border border-line bg-surface p-4">
                  <p className="font-semibold text-heading">{variant.packaging}</p>
                  <p className="mt-1 text-[15px] text-muted">
                    {p.volume}: {variant.volume ?? pending.toLowerCase()}
                  </p>
                  <p className="mt-1 text-[15px] text-foreground">{variant.price}</p>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-[15px] text-muted">{p.packagingNote}</p>

          <div className="mt-8 rounded-sm bg-navy p-6 text-ivory">
            <Users className="size-6 text-gold" aria-hidden />
            <h3 className="mt-3 text-xl font-semibold">{p.bulkTitle}</h3>
            <p className="mt-2 text-[15px] leading-6 text-ivory/80">{p.bulkBody}</p>
            <EnquiryButton interest="bulk" productSlug={product.slug} variant="light" className="mt-5">
              {p.bulkCta}
            </EnquiryButton>
          </div>
        </section>
      </Container>

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line bg-surface-muted py-10 md:py-14">
          <Container>
            <h2 id="related-title" className="text-[1.75rem] font-bold text-heading md:text-3xl">
              {p.related}
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProductCard product={item} locale={locale} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
