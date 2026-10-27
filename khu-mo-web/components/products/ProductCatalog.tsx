"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PackageSearch, SlidersHorizontal } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { format, getDictionary, type Locale } from "@/lib/i18n";
import {
  formatVolume,
  getFilterOptions,
  isCategoryKey,
  isPackagingKey,
  matchesFilters,
  products,
  type ProductFilters,
} from "@/lib/products";
import { cn } from "@/lib/utils";

type FacetKey = keyof ProductFilters;

function readFilters(params: URLSearchParams): ProductFilters {
  const category = params.get("category");
  const packaging = params.get("packaging");
  const volume = Number(params.get("volume"));
  return {
    category: isCategoryKey(category) ? category : null,
    packaging: isPackagingKey(packaging) ? packaging : null,
    volume: Number.isInteger(volume) && volume > 0 ? volume : null,
  };
}

const gridClassName = "grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 xl:grid-cols-3";

type ProductCatalogProps = {
  locale: Locale;
};

export function ProductCatalog({ locale }: ProductCatalogProps) {
  const t = getDictionary(locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(new URLSearchParams(searchParams)), [searchParams]);
  const results = products.filter((product) => matchesFilters(product, filters));
  const activeCount = Object.values(filters).filter((value) => value !== null).length;

  const options = getFilterOptions();
  const facets: { key: FacetKey; label: string; values: { value: string; label: string }[] }[] = [
    {
      key: "category" as const,
      label: t.products.filterCategory,
      values: options.category.map((key) => ({ value: key, label: t.products.categories[key] })),
    },
    {
      key: "volume" as const,
      label: t.products.filterVolume,
      values: options.volume.map((ml) => ({ value: String(ml), label: formatVolume(ml, locale) })),
    },
    {
      key: "packaging" as const,
      label: t.products.filterPackaging,
      values: options.packaging.map((key) => ({ value: key, label: t.products.packaging[key] })),
    },
  ].filter((facet) => facet.values.length > 1);

  function setFilter(key: FacetKey, value: string | null) {
    const params = new URLSearchParams(searchParams);
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function countWith(key: FacetKey, value: string) {
    const next = readFilters(new URLSearchParams({ ...Object.fromEntries(searchParams), [key]: value }));
    return products.filter((product) => matchesFilters(product, next)).length;
  }

  const clearButton = (
    <Button variant="secondary" onClick={() => router.replace(pathname, { scroll: false })}>
      {t.products.clear}
    </Button>
  );

  const filterPanel = facets.length ? (
    <div className="space-y-6">
      {facets.map((facet) => {
        const current = filters[facet.key];
        return (
          <fieldset key={facet.key}>
            <legend className="text-sm font-semibold text-heading">{facet.label}</legend>
            <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
              {[{ value: null, label: t.products.all }, ...facet.values].map((option) => {
                const selected = option.value === null ? current === null : String(current) === option.value;
                const count = option.value === null ? null : countWith(facet.key, option.value);
                const disabled = count === 0 && !selected;
                return (
                  <button
                    key={option.value ?? "all"}
                    type="button"
                    aria-pressed={selected}
                    disabled={disabled}
                    onClick={() => setFilter(facet.key, option.value)}
                    className={cn(
                      "inline-flex min-h-11 items-center justify-between gap-3 rounded-sm border px-4 text-[15px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-45",
                      selected
                        ? "border-accent bg-accent font-semibold text-accent-foreground"
                        : "border-line bg-surface text-foreground hover:border-heading/40",
                    )}
                  >
                    {option.label}
                    {count === null ? null : <span className="text-sm opacity-75">{count}</span>}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  ) : null;

  return (
    <div className={cn("grid gap-8", filterPanel && "lg:grid-cols-[15rem_1fr] lg:gap-12")}>
      {filterPanel ? (
        <aside aria-label={t.products.filters}>
          <h2 className="hidden text-lg font-semibold text-heading lg:block">{t.products.filters}</h2>
          <details className="group rounded-sm border border-line bg-surface lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 px-4 font-semibold text-heading">
              <SlidersHorizontal className="size-4" aria-hidden />
              {t.products.showFilters}
              {activeCount ? (
                <span className="rounded-full bg-accent px-2 text-xs leading-5 text-accent-foreground">{activeCount}</span>
              ) : null}
            </summary>
            <div className="border-t border-line p-4">{filterPanel}</div>
          </details>
          <div className="mt-5 hidden lg:block">{filterPanel}</div>
        </aside>
      ) : null}

      <div>
        <div className="mb-5 flex min-h-11 flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] text-muted" aria-live="polite">
            {format(t.products.resultCount, { n: results.length })}
          </p>
          {activeCount ? clearButton : null}
        </div>
        {results.length ? (
          <ul className={gridClassName}>
            {results.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} locale={locale} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState icon={PackageSearch} title={t.products.emptyTitle} body={t.products.emptyBody} action={clearButton} />
        )}
      </div>
    </div>
  );
}

export function ProductCatalogSkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label}>
      <div className="mb-5 h-11" />
      <div className={gridClassName}>
        {[0, 1, 2].map((index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
