"use client";

import Link from "next/link";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Dialog, DialogHeader } from "@/components/ui/Dialog";
import { getDictionary, type Locale } from "@/lib/i18n";

type NavDrawerProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
};

export function NavDrawer({ locale, open, onClose }: NavDrawerProps) {
  const t = getDictionary(locale);
  const links = [
    { href: `/${locale}#discover`, label: t.nav.discover },
    { href: `/${locale}#story`, label: t.nav.story },
    { href: `/${locale}#visit`, label: t.nav.visit },
    { href: `/${locale}#process`, label: t.nav.process },
  ];

  return (
    <Dialog open={open} onClose={onClose} side="left" label={t.nav.menuLabel}>
      <div className="flex h-full flex-col">
        <DialogHeader title={t.nav.menuLabel} closeLabel={t.nav.close} onClose={onClose} />

        <nav aria-label={t.nav.menuLabel} className="px-3 py-6">
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex min-h-14 items-baseline gap-4 rounded-sm px-3 text-2xl font-semibold tracking-tight transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="text-xs font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="transition group-hover:translate-x-1">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-5 border-t border-line px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {t.nav.language}
            </span>
            <LocaleSwitcher locale={locale} label={t.nav.language} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {t.nav.theme}
            </span>
            <ThemeToggle locale={locale} />
          </div>
          <div className="flex gap-4 pt-2 text-xs text-muted">
            <Link href={`/${locale}/legal/privacy`} onClick={onClose} className="hover:text-foreground">
              {t.footer.privacy}
            </Link>
            <Link href={`/${locale}/legal/terms`} onClick={onClose} className="hover:text-foreground">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
