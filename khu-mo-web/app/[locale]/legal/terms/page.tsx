import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getLocaleAlternates, isLocale, type Locale } from "@/lib/i18n";

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TermsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const currentLocale: Locale = locale;
  const t = getDictionary(currentLocale);
  return {
    title: t.legal.termsTitle,
    description: t.legal.termsDescription,
    alternates: getLocaleAlternates(currentLocale, "/legal/terms"),
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const currentLocale: Locale = locale;
  const t = getDictionary(currentLocale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">{t.legal.termsTitle}</h1>
      <p className="mt-6 text-base leading-7 text-mineral-white/85">{t.legal.termsBody1}</p>
      <p className="mt-4 text-base leading-7 text-mineral-white/85">{t.legal.termsBody2}</p>
      <Link
        href={`/${currentLocale}`}
        className="mt-8 inline-block text-sm font-medium text-gold hover:text-copper"
      >
        {t.legal.backHome}
      </Link>
    </main>
  );
}
