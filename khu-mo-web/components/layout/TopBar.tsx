"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { AnimatedLogo, DOCKED_LOGO_HEIGHT_PX } from "@/components/layout/AnimatedLogo";
import { BrandMark } from "@/components/layout/BrandMark";
import { replaceLocale } from "@/components/layout/LocaleSwitcher";
import { getMainNav, isActive, type NavLink } from "@/components/layout/nav";
import { NavDrawer } from "@/components/layout/NavDrawer";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { ThemeIconButton } from "@/components/layout/ThemeToggle";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const TOPBAR_HEIGHT_PX = 64;

const iconButtonClass =
  "relative inline-flex size-11 items-center justify-center rounded-full transition hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

type Panel = "menu" | "search";

type TopBarProps = {
  locale: Locale;
};

export function TopBar({ locale }: TopBarProps) {
  const t = getDictionary(locale);
  const pathname = usePathname() || `/${locale}`;
  const isHome = pathname === `/${locale}`;
  const { heroTone } = useSiteUI();
  const [panel, setPanel] = useState<Panel | null>(null);
  const [overHero, setOverHero] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const onScroll = () => {
      setOverHero(window.scrollY < window.innerHeight - TOPBAR_HEIGHT_PX - 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const tone = overHero ? (heroTone ?? "light") : null;
  const close = () => setPanel(null);
  const nav = getMainNav(locale);
  const otherLocale = LOCALES.find((value) => value !== locale) ?? locale;
  const logoWidth = Math.round(DOCKED_LOGO_HEIGHT_PX * siteConfig.brand.logoAspectRatio);

  const renderLinks = (links: NavLink[]) =>
    links.map((link) => {
      const active = isActive(pathname, link.href, locale);
      return (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative inline-flex min-h-11 items-center rounded-sm px-3 text-[15px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              "after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:bg-gold after:transition-transform",
              active ? "after:scale-x-100" : "opacity-85 after:scale-x-0 hover:opacity-100 hover:after:scale-x-100",
            )}
          >
            {link.label}
          </Link>
        </li>
      );
    });

  return (
    <>
      <header
        className={cn(
          isHome ? "fixed" : "sticky",
          "inset-x-0 top-0 z-40 h-16 transition-[background-color,color,box-shadow] duration-500",
          tone === "light" && "bg-gradient-to-b from-navy-deep/55 to-transparent text-ivory",
          tone === "dark" && "bg-gradient-to-b from-ivory/70 to-transparent text-navy",
          !tone && "bg-navy text-ivory shadow-[0_1px_0_rgb(184_148_82/0.35)]",
        )}
      >
        <nav
          aria-label={t.nav.mainLabel}
          className="mx-auto grid h-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-2 md:px-6 lg:px-8"
        >
          <div className="flex items-center">
            <button
              type="button"
              aria-label={t.nav.openMenu}
              aria-haspopup="dialog"
              aria-expanded={panel === "menu"}
              onClick={() => setPanel("menu")}
              className={cn(iconButtonClass, "lg:hidden")}
            >
              <Menu className="size-6" aria-hidden />
            </button>
            <ul className="hidden items-center gap-1 lg:flex">{renderLinks(nav.slice(0, 3))}</ul>
          </div>

          <div className="flex justify-center" style={{ width: logoWidth }}>
            {isHome ? null : (
              <Link
                href={`/${locale}`}
                aria-label={t.nav.homeLogo}
                className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <BrandMark className="h-10" />
              </Link>
            )}
          </div>

          <div className="flex items-center justify-end gap-1">
            <ul className="hidden items-center gap-1 lg:flex">{renderLinks(nav.slice(3))}</ul>
            <button
              type="button"
              aria-label={t.nav.search}
              title={t.nav.search}
              aria-haspopup="dialog"
              onClick={() => setPanel("search")}
              className={iconButtonClass}
            >
              <Search className="size-5" aria-hidden />
            </button>
            <ThemeIconButton locale={locale} className={cn(iconButtonClass, "hidden lg:inline-flex")} />
            <Link
              href={replaceLocale(pathname, otherLocale)}
              hrefLang={otherLocale}
              aria-label={`${t.nav.language}: ${otherLocale === "vi" ? "Tiếng Việt" : "English"}`}
              className={cn(iconButtonClass, "hidden text-sm font-semibold uppercase lg:inline-flex")}
            >
              {otherLocale}
            </Link>
          </div>
        </nav>
      </header>

      {isHome ? <AnimatedLogo locale={locale} /> : null}

      <NavDrawer locale={locale} open={panel === "menu"} onClose={close} />
      <SearchDialog locale={locale} open={panel === "search"} onClose={close} />
    </>
  );
}
