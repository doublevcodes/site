export const THEME_STORAGE_KEY = "theme-preference";

export type ThemePreference = "light" | "dark" | "system";

export function resolveThemePreference(pref: ThemePreference): "light" | "dark" {
  if (pref === "light") return "light";
  if (pref === "dark") return "dark";
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function readThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch {
    // Ignore read failures.
  }
  return "system";
}

export function cycleThemePreference(pref: ThemePreference): ThemePreference {
  if (pref === "system") return "light";
  if (pref === "light") return "dark";
  return "system";
}

export function applyThemePreference(pref: ThemePreference): void {
  const resolved = resolveThemePreference(pref);
  document.documentElement.dataset.theme = resolved;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    // Ignore write failures (private mode, blocked storage, etc).
  }
  window.dispatchEvent(
    new CustomEvent("themechange", {
      detail: { preference: pref },
    }),
  );
}
