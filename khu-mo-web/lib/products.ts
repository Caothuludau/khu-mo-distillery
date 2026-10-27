import { z } from "zod";
import rawProducts from "@/content/products.json";
import type { Locale } from "@/lib/i18n";

export const CATEGORY_KEYS = ["traditional", "infused", "other"] as const;
export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export const PACKAGING_KEYS = ["bottle", "pack", "can"] as const;
export type PackagingKey = (typeof PACKAGING_KEYS)[number];

export const PALETTE_KEYS = ["navy", "plum"] as const;
export type PaletteKey = (typeof PALETTE_KEYS)[number];

const localizedText = z.object({ vi: z.string().min(1), en: z.string().min(1) });

const productSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum(CATEGORY_KEYS),
  palette: z.enum(PALETTE_KEYS),
  available: z.boolean(),
  /** Alcohol by volume in percent; null until confirmed by the business. */
  abv: z.number().positive().max(100).nullable(),
  images: z.array(z.string().min(1)),
  variants: z
    .array(
      z.object({
        volumeMl: z.number().int().positive().nullable(),
        packaging: z.enum(PACKAGING_KEYS),
        /** Price in VND; null shows "contact for a quote". */
        price: z.number().int().positive().nullable(),
      }),
    )
    .min(1),
  name: localizedText,
  tagline: localizedText,
  colors: localizedText,
  description: localizedText,
  ingredients: localizedText.nullable(),
  origin: localizedText.nullable(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductVariant = Product["variants"][number];

export const products: Product[] = z
  .object({ products: z.array(productSchema).min(1) })
  .parse(rawProducts).products;

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function text(value: { vi: string; en: string }, locale: Locale): string;
export function text(value: { vi: string; en: string } | null, locale: Locale): string | null;
export function text(value: { vi: string; en: string } | null, locale: Locale) {
  return value ? value[locale] : null;
}

export function formatVolume(ml: number, locale: Locale): string {
  if (ml >= 1000) {
    const litres = new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", {
      maximumFractionDigits: 2,
    }).format(ml / 1000);
    return `${litres} L`;
  }
  return `${ml} ml`;
}

export function formatPrice(price: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Distinct confirmed volumes, smallest first. */
export function productVolumes(product: Product): number[] {
  const volumes = product.variants.flatMap((variant) =>
    variant.volumeMl === null ? [] : [variant.volumeMl],
  );
  return [...new Set(volumes)].sort((a, b) => a - b);
}

export function productPackagings(product: Product): PackagingKey[] {
  return PACKAGING_KEYS.filter((key) => product.variants.some((variant) => variant.packaging === key));
}

/** Lowest confirmed price, or null when every variant is quote-only. */
export function lowestPrice(product: Product): number | null {
  const prices = product.variants.flatMap((variant) => (variant.price === null ? [] : [variant.price]));
  return prices.length ? Math.min(...prices) : null;
}

export type ProductFilters = {
  category: CategoryKey | null;
  volume: number | null;
  packaging: PackagingKey | null;
};

export const EMPTY_FILTERS: ProductFilters = { category: null, volume: null, packaging: null };

export function matchesFilters(product: Product, filters: ProductFilters): boolean {
  if (filters.category && product.category !== filters.category) {
    return false;
  }
  return product.variants.some(
    (variant) =>
      (filters.volume === null || variant.volumeMl === filters.volume) &&
      (filters.packaging === null || variant.packaging === filters.packaging),
  );
}

/** Filter options that exist somewhere in the catalogue; options with no products are never offered. */
export function getFilterOptions(list: Product[] = products) {
  return {
    category: CATEGORY_KEYS.filter((key) => list.some((product) => product.category === key)),
    volume: [...new Set(list.flatMap(productVolumes))].sort((a, b) => a - b),
    packaging: PACKAGING_KEYS.filter((key) => list.some((product) => productPackagings(product).includes(key))),
  };
}

export function isCategoryKey(value: string | null): value is CategoryKey {
  return !!value && (CATEGORY_KEYS as readonly string[]).includes(value);
}

export function isPackagingKey(value: string | null): value is PackagingKey {
  return !!value && (PACKAGING_KEYS as readonly string[]).includes(value);
}

/** Case- and diacritic-insensitive form, so "ruou nep" matches "Rượu nếp". */
export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase();
}
