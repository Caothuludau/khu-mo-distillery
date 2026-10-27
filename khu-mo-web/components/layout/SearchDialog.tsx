"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, SearchX, X } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { Dialog } from "@/components/ui/Dialog";
import { format, getDictionary, type Locale } from "@/lib/i18n";
import { normalizeSearch, products, text } from "@/lib/products";

type SearchDialogProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ locale, open, onClose }: SearchDialogProps) {
  const t = getDictionary(locale);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  const results = useMemo(() => {
    const words = normalizeSearch(trimmed).split(/\s+/).filter(Boolean);
    return products.filter((product) => {
      const haystack = normalizeSearch(
        [
          text(product.name, locale),
          text(product.tagline, locale),
          text(product.description, locale),
          t.products.categories[product.category],
        ].join(" "),
      );
      return words.every((word) => haystack.includes(word));
    });
  }, [trimmed, locale, t]);

  function finish() {
    onClose();
    setQuery("");
  }

  return (
    <Dialog open={open} onClose={onClose} side="top" label={t.search.label}>
      <div className="mx-auto max-w-3xl px-4 pb-6 pt-4 md:px-6">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            if (results[0]) {
              finish();
              router.push(`/${locale}/products/${results[0].slug}`);
            }
          }}
          className="flex items-center gap-3 border-b-2 border-heading/20 pb-3 focus-within:border-gold"
        >
          <Search className="size-5 shrink-0 text-muted" aria-hidden />
          <label htmlFor="site-search" className="sr-only">
            {t.search.label}
          </label>
          <input
            id="site-search"
            type="search"
            autoFocus
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.search.placeholder}
            className="min-h-12 w-full bg-transparent text-lg outline-none placeholder:text-muted/80"
          />
          <button
            type="button"
            aria-label={t.common.close}
            onClick={onClose}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="size-5" aria-hidden />
          </button>
        </form>

        <div aria-live="polite">
          {results.length === 0 ? (
            <div className="mt-6 flex items-start gap-3">
              <SearchX className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden />
              <div>
                <p className="font-semibold text-heading">{format(t.search.noResults, { q: trimmed })}</p>
                <p className="mt-1 text-sm text-muted">{t.search.noResultsHint}</p>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm font-medium text-muted">
              {trimmed ? format(t.products.resultCount, { n: results.length }) : t.search.hint}
            </p>
          )}
        </div>

        {results.length ? (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {results.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/${locale}/products/${product.slug}`}
                  onClick={finish}
                  className="flex items-center gap-3 rounded-sm p-2 transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ProductImage product={product} locale={locale} sizes="56px" className="size-14 shrink-0" compact />
                  <span>
                    <span className="block font-semibold text-heading">{text(product.name, locale)}</span>
                    <span className="block text-sm text-muted">{t.products.categories[product.category]}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          href={`/${locale}/products`}
          onClick={finish}
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-heading underline-offset-4 hover:underline"
        >
          {t.search.viewAll}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </Dialog>
  );
}
