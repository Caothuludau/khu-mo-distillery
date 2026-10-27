import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { AgeGate } from "@/components/consent/AgeGate";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopBar } from "@/components/layout/TopBar";
import { SiteUIProvider } from "@/components/providers/SiteUIProvider";
import { getDictionary, getLocaleAlternates, isLocale, LOCALES } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";
import { initScript, SITE_ROOT_ID } from "@/lib/init-script";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-be-vietnam",
});

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
      template: `%s | ${t.meta.siteName}`,
    },
    description: t.meta.description,
    applicationName: t.meta.siteName,
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
      siteName: t.meta.siteName,
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
    <html lang={locale} className={beVietnamPro.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="min-h-dvh bg-background font-sans text-base text-foreground antialiased">
        <SiteUIProvider locale={locale}>
          <div id={SITE_ROOT_ID} className="flex min-h-dvh flex-col">
            <TopBar locale={locale} />
            <div className="flex-1">{children}</div>
            <SiteFooter locale={locale} />
          </div>
          <CookieConsent locale={locale} />
          <AgeGate locale={locale} />
        </SiteUIProvider>
      </body>
    </html>
  );
}
