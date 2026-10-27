"use client";

import { Moon, Sun } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { useTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  locale: Locale;
};

/** Segmented light/dark control for the menu drawer. */
export function ThemeToggle({ locale }: ThemeToggleProps) {
  const t = getDictionary(locale);
  const { theme, setTheme } = useTheme();
  const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
    { value: "light", label: t.nav.themeLight, Icon: Sun },
    { value: "dark", label: t.nav.themeDark, Icon: Moon },
  ];

  return (
    <div role="group" aria-label={t.nav.theme} className="flex rounded-full border border-line p-0.5">
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              active ? "bg-heading text-background" : "text-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
}

type ThemeIconButtonProps = {
  locale: Locale;
  className?: string;
};

/** Single icon button for the desktop top bar. */
export function ThemeIconButton({ locale, className }: ThemeIconButtonProps) {
  const t = getDictionary(locale);
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const label = dark ? t.nav.switchToLight : t.nav.switchToDark;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={className}
    >
      {dark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
    </button>
  );
}
