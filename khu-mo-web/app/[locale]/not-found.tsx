"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DEFAULT_LOCALE, getDictionary, isLocale } from "@/lib/i18n";

export default function LocaleNotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t.notFound.title}</h1>
      <p className="mt-6 text-base leading-7 text-muted">{t.notFound.body}</p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-block text-sm font-medium text-accent hover:text-accent-hover"
      >
        {t.legal.backHome}
      </Link>
    </main>
  );
}
