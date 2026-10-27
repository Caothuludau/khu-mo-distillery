"use client";

import { openCookiePreferences } from "@/lib/consent";

type CookieSettingsButtonProps = {
  label: string;
  className?: string;
};

export function CookieSettingsButton({ label, className }: CookieSettingsButtonProps) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {label}
    </button>
  );
}
