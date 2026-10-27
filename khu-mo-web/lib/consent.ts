"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/lib/init-script";

export type CookieConsent = {
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const listeners = new Set<() => void>();
let preferencesOpen = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEYS.ageVerified || event.key === STORAGE_KEYS.cookieConsent) {
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies for this page view.
  }
}

function isAgeVerified(): boolean {
  return document.documentElement.dataset.ageOk !== undefined || read(STORAGE_KEYS.ageVerified) === "1";
}

/** False on the server, so the gate is part of the HTML and hidden by CSS for returning visitors. */
export function useAgeVerified(): boolean {
  return useSyncExternalStore(subscribe, isAgeVerified, () => false);
}

export function confirmAge() {
  document.documentElement.dataset.ageOk = "";
  write(STORAGE_KEYS.ageVerified, "1");
  emit();
}

let cachedRaw: string | null | undefined;
let cachedConsent: CookieConsent | null = null;

function getConsent(): CookieConsent | null {
  const raw = read(STORAGE_KEYS.cookieConsent);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedConsent = raw ? (JSON.parse(raw) as CookieConsent) : null;
    } catch {
      cachedConsent = null;
    }
  }
  return cachedConsent;
}

/** `undefined` during server rendering, `null` when the visitor has not chosen yet. */
export function useCookieConsent(): CookieConsent | null | undefined {
  return useSyncExternalStore<CookieConsent | null | undefined>(subscribe, getConsent, () => undefined);
}

export function saveCookieConsent(choice: Pick<CookieConsent, "analytics" | "marketing">) {
  write(STORAGE_KEYS.cookieConsent, JSON.stringify({ ...choice, updatedAt: new Date().toISOString() }));
  preferencesOpen = false;
  emit();
}

export function useCookiePreferencesOpen(): boolean {
  return useSyncExternalStore(subscribe, () => preferencesOpen, () => false);
}

export function openCookiePreferences() {
  preferencesOpen = true;
  emit();
}

export function closeCookiePreferences() {
  preferencesOpen = false;
  emit();
}
