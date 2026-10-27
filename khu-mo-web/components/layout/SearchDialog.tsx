"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
import { Dialog } from "@/components/ui/Dialog";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig, type ProductKey } from "@/lib/site-config";

/** Case- and diacritic-insensitive form, so "ruou" matches "rượu". */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase();
}

type SearchDialogProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
  isHome: boolean;
};

export function SearchDialog({ locale, open, onClose, isHome }: SearchDialogProps) {
  const t = getDictionary(locale);
  const router = useRouter();
  const { focusProduct } = useSiteUI();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return siteConfig.product.items.filter(({ key }) => {
      const item = t.discover.items[key];
      const haystack = normalize(`${item.name} ${item.blurb} ${t.discover.categories[item.category]}`);
      return words.every((word) => haystack.includes(word));
    });
  }, [query, t]);

  function select(key: ProductKey) {
    onClose();
    setQuery("");
    focusProduct(key);
    if (isHome) {
      window.setTimeout(() => document.getElementById("discover")?.scrollIntoView(), 50);
    } else {
      router.push(`/${locale}#discover`);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} side="top" label={t.search.label}>
      <div className="mx-auto max-w-3xl px-4 pb-6 pt-4 md:px-6">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            if (results[0]) {
              select(results[0].key);
            }
          }}
          className="flex items-center gap-3 border-b border-line pb-3"
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
            className="min-h-12 w-full bg-transparent text-lg outline-none placeholder:text-muted/70"
          />
          <button
            type="button"
            aria-label={t.nav.close}
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="size-5" aria-hidden />
          </button>
        </form>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted" aria-live="polite">
          {results.length === 0 ? t.search.empty : query ? null : t.search.hint}
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {results.map(({ key, image }) => {
            const item = t.discover.items[key];
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => select(key)}
                  className="flex w-full items-center gap-3 rounded-sm p-2 text-left transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-sm bg-surface-muted">
                    <Image src={image} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block font-semibold">{item.name}</span>
                    <span className="block text-xs text-muted">{t.discover.categories[item.category]}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Dialog>
  );
}
