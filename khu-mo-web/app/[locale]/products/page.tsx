import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCatalog, ProductCatalogSkeleton } from "@/components/products/ProductCatalog";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getDictionary, getLocaleAlternates, isLocale } from "@/lib/i18n";

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const t = getDictionary(locale);
  return {
    title: t.products.title,
    description: t.products.intro,
    alternates: getLocaleAlternates(locale, "/products"),
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);

  return (
    <main>
      <PageHero
        title={t.products.title}
        intro={t.products.intro}
        breadcrumbLabel={t.common.breadcrumb}
        breadcrumb={[{ label: t.common.home, href: `/${locale}` }, { label: t.products.title }]}
      />
      <Container className="py-10 md:py-14">
        <Suspense fallback={<ProductCatalogSkeleton label={t.products.loading} />}>
          <ProductCatalog locale={locale} />
        </Suspense>
      </Container>
    </main>
  );
}
