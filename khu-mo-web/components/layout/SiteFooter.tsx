import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { getDictionary, type Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = getDictionary(locale);
  const linkClassName =
    "inline-flex min-h-11 items-center rounded-sm px-2 font-medium transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <footer className="border-t border-line bg-surface-muted">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <BrandMark className="h-8 text-foreground" />
          <p>{t.footer.heritage}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/${locale}#discover`} className={linkClassName}>
            {t.nav.discover}
          </Link>
          <Link href={`/${locale}#visit`} className={linkClassName}>
            {t.nav.visit}
          </Link>
          <Link href={`/${locale}/legal/privacy`} className={linkClassName}>
            {t.footer.privacy}
          </Link>
          <Link href={`/${locale}/legal/terms`} className={linkClassName}>
            {t.footer.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
