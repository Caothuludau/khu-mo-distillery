"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

function replaceLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && LOCALES.includes(segments[1] as Locale)) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }
  return `/${locale}`;
}

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LocaleSwitcher({ locale, label }: LocaleSwitcherProps) {
  const pathname = usePathname() || "/";

  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">{label}</span>
      {LOCALES.map((value) => {
        const href = replaceLocale(pathname, value);
        const active = value === locale;
        return (
          <Link
            key={value}
            href={href}
            className={[
              "inline-flex min-h-9 items-center rounded border px-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition",
              active
                ? "border-gold bg-gold/15 text-gold"
                : "border-mineral-white/25 text-mineral-white/80 hover:border-mineral-white/45 hover:text-mineral-white",
            ].join(" ")}
            hrefLang={value}
            locale={false}
          >
            {value}
          </Link>
        );
      })}
    </div>
  );
}
