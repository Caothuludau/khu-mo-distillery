"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, User } from "lucide-react";
import { AccountDialog } from "@/components/layout/AccountDialog";
import { AnimatedLogo } from "@/components/layout/AnimatedLogo";
import { BrandMark } from "@/components/layout/BrandMark";
import { NavDrawer } from "@/components/layout/NavDrawer";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist";

const TOPBAR_HEIGHT_PX = 64;

type Panel = "menu" | "search" | "account" | "wishlist";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

function IconButton({ label, className, children, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex size-11 items-center justify-center rounded-full transition hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type TopBarProps = {
  locale: Locale;
};

export function TopBar({ locale }: TopBarProps) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const isHome = pathname === `/${locale}`;
  const { heroTone } = useSiteUI();
  const wishlist = useWishlist();
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

  return (
    <>
      <header
        className={cn(
          isHome ? "fixed" : "sticky",
          "inset-x-0 top-0 z-40 h-16 transition-[background-color,border-color,color] duration-500",
          tone
            ? "border-b border-transparent"
            : "border-b border-line bg-background/90 backdrop-blur-md",
          tone === "light" && "bg-gradient-to-b from-charcoal/45 to-transparent text-mineral-white",
          tone === "dark" && "bg-gradient-to-b from-white/55 to-transparent text-charcoal",
          !tone && "text-foreground",
        )}
      >
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-2 md:px-6">
          <div className="flex">
            <IconButton
              label={t.nav.openMenu}
              aria-haspopup="dialog"
              aria-expanded={panel === "menu"}
              onClick={() => setPanel("menu")}
            >
              <Menu className="size-6" aria-hidden />
            </IconButton>
          </div>

          <div className="flex justify-center">
            {isHome ? null : (
              <Link
                href={`/${locale}`}
                aria-label={t.nav.home}
                className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <BrandMark className="h-10" />
              </Link>
            )}
          </div>

          <div className="flex items-center justify-end gap-0.5 md:gap-1">
            <IconButton
              label={t.nav.search}
              aria-haspopup="dialog"
              onClick={() => setPanel("search")}
            >
              <Search className="size-5" aria-hidden />
            </IconButton>
            <IconButton
              label={t.nav.account}
              aria-haspopup="dialog"
              onClick={() => setPanel("account")}
            >
              <User className="size-5" aria-hidden />
            </IconButton>
            <IconButton
              label={wishlist.length ? `${t.nav.wishlist} (${wishlist.length})` : t.nav.wishlist}
              aria-haspopup="dialog"
              onClick={() => setPanel("wishlist")}
            >
              <Heart className="size-5" aria-hidden />
              {wishlist.length ? (
                <span className="absolute right-1 top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-4 text-accent-foreground">
                  {wishlist.length}
                </span>
              ) : null}
            </IconButton>
          </div>
        </div>
      </header>

      {isHome ? <AnimatedLogo locale={locale} /> : null}

      <NavDrawer locale={locale} open={panel === "menu"} onClose={close} />
      <SearchDialog locale={locale} open={panel === "search"} onClose={close} isHome={isHome} />
      <AccountDialog locale={locale} open={panel === "account"} onClose={close} />
      <WishlistDrawer locale={locale} open={panel === "wishlist"} onClose={close} />
    </>
  );
}
