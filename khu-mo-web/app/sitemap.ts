import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getLocaleAlternates, LOCALES } from "@/lib/i18n";

const pages = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.2 },
] as const;

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
