"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { getMainNav, isActive } from "@/components/layout/nav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogHeader } from "@/components/ui/Dialog";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavDrawerProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
};

export function NavDrawer({ locale, open, onClose }: NavDrawerProps) {
  const t = getDictionary(locale);
  const pathname = usePathname() || `/${locale}`;
  const { openEnquiry } = useSiteUI();

  return (
    <Dialog open={open} onClose={onClose} side="left" label={t.nav.menuLabel}>
      <div className="flex min-h-full flex-col">
        <DialogHeader title={t.nav.menuLabel} closeLabel={t.common.close} onClose={onClose} />

        <nav aria-label={t.nav.mainLabel} className="px-3 py-4">
          <ul className="space-y-1">
            {getMainNav(locale).map((link) => {
              const active = isActive(pathname, link.href, locale);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-13 items-center gap-3 rounded-sm border-l-2 px-4 text-xl font-semibold transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      active ? "border-gold text-heading" : "border-transparent text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-6">
          <Button
            className="w-full"
            onClick={() => {
              onClose();
              openEnquiry({ interest: "purchase" });
            }}
          >
            {t.nav.orderCta}
          </Button>
        </div>

        <div className="mt-auto space-y-4 border-t border-line px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-muted">{t.nav.language}</span>
            <LocaleSwitcher locale={locale} label={t.nav.language} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-muted">{t.nav.theme}</span>
            <ThemeToggle locale={locale} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
