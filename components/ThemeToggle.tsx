"use client";

import { useEffect, useState } from "react";
import {
  applyThemePreference,
  cycleThemePreference,
  readThemePreference,
  resolveThemePreference,
  type ThemePreference,
} from "@/lib/theme";

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const pref = readThemePreference();
    document.documentElement.dataset.theme = resolveThemePreference(pref);
    setPreference(pref);
    setIsReady(true);

    const onThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ preference?: ThemePreference }>;
      if (
        customEvent.detail?.preference === "dark" ||
        customEvent.detail?.preference === "light" ||
        customEvent.detail?.preference === "system"
      ) {
        setPreference(customEvent.detail.preference);
      } else {
        setPreference(readThemePreference());
      }
    };

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSchemeChange = () => {
      if (readThemePreference() === "system") {
        document.documentElement.dataset.theme = resolveThemePreference("system");
      }
    };

    window.addEventListener("themechange", onThemeChange);
    mq.addEventListener("change", onSchemeChange);
    return () => {
      window.removeEventListener("themechange", onThemeChange);
      mq.removeEventListener("change", onSchemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const next = cycleThemePreference(readThemePreference());
    applyThemePreference(next);
    setPreference(next);
  };

  return (
    <div className="group font-brutal-mono flex shrink-0 items-center gap-2 text-[0.9rem] uppercase tracking-[0.08em]">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Cycle color theme: system, light, and dark"
        className="cursor-pointer border-2 border-transparent border-b-[var(--color-fg)] px-2 py-1 text-[0.78rem] leading-none"
      >
        {isReady ? `MODE: ${preference}` : "MODE"}
      </button>
      <button
        type="button"
        className="keycap keycap-hotkey cursor-pointer"
        onClick={toggleTheme}
        aria-label="Cycle color theme: system, light, and dark"
      >
        T
      </button>
    </div>
  );
}
