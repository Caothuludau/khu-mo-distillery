import Link from "next/link";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { getNavLinks } from "@/components/layout/nav-links";
import { getDictionary, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const t = getDictionary(locale);
  const navLinks = getNavLinks(locale, t.nav);

  return (
    <header className="sticky top-0 z-40 border-b border-mineral-white/10 bg-charcoal/95 backdrop-blur supports-[backdrop-filter]:bg-charcoal/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href={`/${locale}`}
          className="rounded px-1 py-0.5 text-lg font-semibold tracking-[0.2em] text-mineral-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        >
          KHU MỎ
        </Link>

        <nav className="hidden md:block" aria-label={t.nav.primaryLabel}>
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded px-3 text-sm font-medium text-mineral-white/90 transition hover:bg-mineral-white/10 hover:text-mineral-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher locale={locale} label={t.nav.language} />
          </div>
          <Link
            href={`/${locale}#contact`}
            className="hidden min-h-11 items-center rounded bg-gold px-5 text-sm font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-white focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal md:inline-flex"
          >
            {t.nav.enquire}
          </Link>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
