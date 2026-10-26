"use client";

import Link from "next/link";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { getNavLinks } from "@/components/layout/nav-links";
import { getDictionary, type Locale } from "@/lib/i18n";

type MobileNavProps = {
  locale: Locale;
};

export function MobileNav({ locale }: MobileNavProps) {
  const t = getDictionary(locale);
  const navLinks = getNavLinks(locale, t.nav);
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={t.nav.menu}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-mineral-white/25 px-3 text-sm font-medium text-mineral-white transition hover:border-mineral-white/50 hover:bg-mineral-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        onClick={() => setOpen(true)}
      >
        {t.nav.menu}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.mobileLabel}
        >
          <div
            id="mobile-nav-panel"
            className="ml-auto flex h-full w-[min(22rem,88vw)] flex-col gap-5 border-l border-mineral-white/20 bg-iron-gray p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-mineral-white/80">
                Khu Mỏ
              </span>
              <button
                type="button"
                aria-label={t.nav.close}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-mineral-white/25 px-3 text-sm font-medium text-mineral-white transition hover:border-mineral-white/50 hover:bg-mineral-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-iron-gray"
                onClick={() => setOpen(false)}
              >
                {t.nav.close}
              </button>
            </div>

            <LocaleSwitcher locale={locale} label={t.nav.language} />

            <nav aria-label={t.nav.mobileLabel}>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 w-full items-center rounded px-3 text-base font-medium text-mineral-white transition hover:bg-mineral-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-iron-gray"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href={`/${locale}#contact`}
              className="inline-flex min-h-11 items-center justify-center rounded bg-gold px-5 text-sm font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-white focus-visible:ring-offset-2 focus-visible:ring-offset-iron-gray"
              onClick={() => setOpen(false)}
            >
              {t.nav.enquire}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
