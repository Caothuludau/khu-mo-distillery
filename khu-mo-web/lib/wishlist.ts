"use client";

import { useSyncExternalStore } from "react";
import { isProductKey, type ProductKey } from "@/lib/site-config";

const STORAGE_KEY = "khu-mo:wishlist";
const EMPTY: ProductKey[] = [];
const listeners = new Set<() => void>();
let cache: ProductKey[] | null = null;

function read(): ProductKey[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((value): value is ProductKey => typeof value === "string" && isProductKey(value))
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): ProductKey[] {
  if (cache === null) {
    cache = read();
  }
  return cache;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = read();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function write(next: ProductKey[]) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Keep the in-memory list when storage is unavailable.
  }
  emit();
}

export function toggleWishlist(key: ProductKey) {
  const current = getSnapshot();
  write(current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
}

export function removeFromWishlist(key: ProductKey) {
  write(getSnapshot().filter((item) => item !== key));
}

export function useWishlist(): ProductKey[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}
