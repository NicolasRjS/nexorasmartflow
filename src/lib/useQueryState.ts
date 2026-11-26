"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
}

/**
 * Keeps a small piece of UI state in the URL query (?key=value) so views can be shared and
 * deep-linked. Returns the fallback while rendering on the server and during hydration.
 */
export function useQueryState<T extends string>(key: string, allowed: readonly T[], fallback: T) {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      const v = new URLSearchParams(window.location.search).get(key);
      return (allowed as readonly string[]).includes(v ?? "") ? (v as T) : fallback;
    },
    () => fallback,
  );

  const setValue = useCallback(
    (next: T) => {
      const url = new URL(window.location.href);
      if (next === fallback) url.searchParams.delete(key);
      else url.searchParams.set(key, next);
      window.history.replaceState(window.history.state, "", url);
      emit();
    },
    [key, fallback],
  );

  return [value, setValue] as const;
}
