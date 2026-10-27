"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DEFAULT_LOCALE, getDictionary, isLocale } from "@/lib/i18n";

export default function LocaleNotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  return (
    <main>
      <Container className="py-20 md:py-28">
        <p className="text-sm font-semibold tracking-[0.16em] text-highlight">404</p>
        <h1 className="mt-3 text-[2rem] font-bold text-heading md:text-5xl">{t.notFound.title}</h1>
        <p className="mt-4 max-w-prose text-base leading-7 text-muted md:text-[17px]">{t.notFound.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${locale}`} className={buttonStyles("primary")}>
            {t.common.backHome}
          </Link>
          <Link href={`/${locale}/products`} className={buttonStyles("secondary")}>
            {t.search.viewAll}
          </Link>
        </div>
      </Container>
    </main>
  );
}
