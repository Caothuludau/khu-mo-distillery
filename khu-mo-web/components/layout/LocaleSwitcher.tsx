"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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
    <div role="group" aria-label={label} className="flex rounded-full border border-line p-0.5">
      {LOCALES.map((value) => {
        const active = value === locale;
        return (
          <Link
            key={value}
            href={replaceLocale(pathname, value)}
            hrefLang={value}
            aria-current={active ? "true" : undefined}
            className={cn(
              "inline-flex min-h-9 items-center rounded-full px-3 text-xs font-semibold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              active ? "bg-foreground text-background" : "text-muted hover:text-foreground",
            )}
          >
            {value}
          </Link>
        );
      })}
    </div>
  );
}
