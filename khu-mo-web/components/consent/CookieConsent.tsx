"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  closeCookiePreferences,
  saveCookieConsent,
  useAgeVerified,
  useCookieConsent,
  useCookiePreferencesOpen,
} from "@/lib/consent";
import { getDictionary, type Locale } from "@/lib/i18n";

type CookieConsentProps = {
  locale: Locale;
};

/** Small, non-blocking notice shown after the age gate; reopened from the footer's cookie settings. */
export function CookieConsent({ locale }: CookieConsentProps) {
  const ageVerified = useAgeVerified();
  const consent = useCookieConsent();
  const preferencesOpen = useCookiePreferencesOpen();

  const visible = ageVerified && (consent === null || preferencesOpen);
  if (!visible) {
    return null;
  }

  return (
    <CookiePanel
      key={consent?.updatedAt ?? "new"}
      locale={locale}
      initial={consent ?? null}
      startCustomizing={preferencesOpen}
      dismissible={!!consent}
    />
  );
}

type CookiePanelProps = {
  locale: Locale;
  initial: { analytics: boolean; marketing: boolean } | null;
  startCustomizing: boolean;
  dismissible: boolean;
};

function CookiePanel({ locale, initial, startCustomizing, dismissible }: CookiePanelProps) {
  const t = getDictionary(locale);
  const [customizing, setCustomizing] = useState(startCustomizing);
  const [analytics, setAnalytics] = useState(initial?.analytics ?? false);
  const [marketing, setMarketing] = useState(initial?.marketing ?? false);

  const toggles = [
    { key: "analytics", checked: analytics, onChange: setAnalytics },
    { key: "marketing", checked: marketing, onChange: setMarketing },
  ] as const;

  return (
    <section
      aria-label={t.cookies.label}
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl rounded-sm border border-line bg-surface p-5 text-foreground shadow-2xl md:inset-x-6 md:bottom-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-base font-semibold text-heading">{t.cookies.label}</h2>
        {dismissible ? (
          <button
            type="button"
            aria-label={t.common.close}
            onClick={closeCookiePreferences}
            className="-mr-2 -mt-2 inline-flex size-11 items-center justify-center rounded-full transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="size-5" aria-hidden />
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">
        {t.cookies.body}{" "}
        <Link href={`/${locale}/legal/cookies`} className="font-medium text-heading underline underline-offset-2">
          {t.cookies.policy}
        </Link>
      </p>

      {customizing ? (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          <li className="flex items-start justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-semibold">{t.cookies.categories.essential.title}</p>
              <p className="mt-0.5 text-sm text-muted">{t.cookies.categories.essential.body}</p>
            </div>
            <span className="shrink-0 pt-0.5 text-xs font-semibold text-highlight">{t.cookies.alwaysOn}</span>
          </li>
          {toggles.map(({ key, checked, onChange }) => (
            <li key={key} className="py-3">
              <label className="flex cursor-pointer items-start justify-between gap-4">
                <span>
                  <span className="block text-sm font-semibold">{t.cookies.categories[key].title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{t.cookies.categories[key].body}</span>
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => onChange(event.target.checked)}
                  className="mt-1 size-5 shrink-0 accent-[var(--accent)]"
                />
              </label>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {customizing ? (
          <Button onClick={() => saveCookieConsent({ analytics, marketing })}>{t.cookies.save}</Button>
        ) : (
          <Button onClick={() => saveCookieConsent({ analytics: true, marketing: true })}>
            {t.cookies.acceptAll}
          </Button>
        )}
        <Button variant="secondary" onClick={() => saveCookieConsent({ analytics: false, marketing: false })}>
          {t.cookies.rejectOptional}
        </Button>
        {customizing ? null : (
          <Button variant="text" onClick={() => setCustomizing(true)}>
            {t.cookies.customize}
          </Button>
        )}
      </div>
    </section>
  );
}
