"use client";

import { Moon, Sun } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { useTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  locale: Locale;
};

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
              "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              active ? "bg-foreground text-background" : "text-muted hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
}
