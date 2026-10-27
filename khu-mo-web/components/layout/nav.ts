import { getDictionary, type Locale } from "@/lib/i18n";

export type NavLink = { href: string; label: string };

/** Main menu order from the design spec: Home · Products · Story · Where to buy · Partners. */
export function getMainNav(locale: Locale): NavLink[] {
  const t = getDictionary(locale);
  return [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/products`, label: t.nav.products },
    { href: `/${locale}/story`, label: t.nav.story },
    { href: `/${locale}/where-to-buy`, label: t.nav.whereToBuy },
    { href: `/${locale}/partners`, label: t.nav.partners },
  ];
}

export function isActive(pathname: string, href: string, locale: Locale): boolean {
  if (href === `/${locale}`) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
