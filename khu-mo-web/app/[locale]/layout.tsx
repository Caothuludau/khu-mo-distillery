import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getDictionary, getLocaleAlternates, isLocale, LOCALES } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const t = getDictionary(locale);

  return {
    metadataBase: getSiteUrl(),
    title: {
      default: t.meta.title,
      template: `%s | ${locale === "vi" ? "Khu Mỏ" : "Khu Mo"}`,
    },
    description: t.meta.description,
    applicationName: "Khu Mo",
    alternates: getLocaleAlternates(locale),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: t.meta.ogLocale,
      alternateLocale: LOCALES.filter((value) => value !== locale).map(
        (value) => getDictionary(value).meta.ogLocale,
      ),
      siteName: "Khu Mo",
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: "summary",
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="dark">
      <body className="min-h-dvh bg-charcoal text-mineral-white antialiased">
        <div className="flex min-h-dvh flex-col">
          <SiteHeader locale={locale} />
          <div className="flex-1">{children}</div>
          <SiteFooter locale={locale} />
        </div>
      </body>
    </html>
  );
}
