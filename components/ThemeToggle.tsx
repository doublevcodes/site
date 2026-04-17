"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme-preference";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getThemeFromDom(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialTheme = getThemeFromDom() ?? getPreferredTheme();
    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
    setIsReady(true);

    const onThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme?: Theme }>;
      if (customEvent.detail?.theme === "dark" || customEvent.detail?.theme === "light") {
        setTheme(customEvent.detail.theme);
      } else {
        setTheme(getThemeFromDom());
      }
    };

    window.addEventListener("themechange", onThemeChange);
    return () => window.removeEventListener("themechange", onThemeChange);
  }, []);

  const toggleTheme = () => {
    const currentTheme = getThemeFromDom();
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Ignore write failures (private mode, blocked storage, etc).
    }
  };

  return (
    <div className="group font-brutal-mono fixed top-[clamp(1rem,3vw,2rem)] right-[clamp(1rem,3vw,2rem)] z-50 flex items-center gap-2 text-[0.9rem] uppercase tracking-[0.08em]">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle color theme"
        className="cursor-pointer border-2 border-transparent border-b-[var(--color-fg)] px-2 py-1 text-[0.78rem] leading-none"
      >
        {isReady ? `MODE: ${theme}` : "MODE"}
      </button>
      <button
        type="button"
        className="keycap keycap-hotkey cursor-pointer"
        onClick={toggleTheme}
        aria-label="Toggle color theme"
      >
        T
      </button>
    </div>
  );
}
