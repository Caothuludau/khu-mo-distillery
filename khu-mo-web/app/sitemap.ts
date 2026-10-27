import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getLocaleAlternates, LEGAL_DOCS, LOCALES } from "@/lib/i18n";
import { products } from "@/lib/products";

type Page = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const pages: Page[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/products", changeFrequency: "monthly", priority: 0.9 },
  ...products.map((product) => ({
    path: `/products/${product.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  { path: "/story", changeFrequency: "monthly", priority: 0.7 },
  { path: "/where-to-buy", changeFrequency: "monthly", priority: 0.8 },
  { path: "/partners", changeFrequency: "yearly", priority: 0.6 },
  ...LEGAL_DOCS.map((doc) => ({ path: `/legal/${doc}`, changeFrequency: "yearly" as const, priority: 0.2 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const toAbsolute = (path: string) => new URL(path, base).href;

  return LOCALES.flatMap((locale) =>
    pages.map(({ path, changeFrequency, priority }) => {
      const { languages } = getLocaleAlternates(locale, path);
      return {
        url: toAbsolute(`/${locale}${path}`),
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(languages).map(([lang, href]) => [lang, toAbsolute(href)]),
          ),
        },
      };
    }),
  );
}
