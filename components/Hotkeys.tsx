"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Theme = "dark" | "light";

const KEY_TO_ROUTE: Record<string, string> = {
  "1": "/",
  h: "/",
  "2": "/about",
  "3": "/blog",
  "4": "/projects",
};

const THEME_STORAGE_KEY = "theme-preference";

function getThemeFromDom(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function Hotkeys() {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (!target) return;

      const tagName = target.tagName.toLowerCase();
      const isTypingField =
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        target.isContentEditable;
      if (isTypingField) return;

      const key = event.key.toLowerCase();
      if (key === "t") {
        event.preventDefault();
        const currentTheme = getThemeFromDom();
        const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = nextTheme;
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        } catch {
          // Ignore write failures (private mode, blocked storage, etc).
        }
        window.dispatchEvent(
          new CustomEvent("themechange", {
            detail: { theme: nextTheme },
          }),
        );
        return;
      }

      const route = KEY_TO_ROUTE[key];
      if (!route) return;

      event.preventDefault();
      router.push(route);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}
