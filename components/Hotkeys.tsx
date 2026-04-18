"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  applyThemePreference,
  cycleThemePreference,
  readThemePreference,
} from "@/lib/theme";

const KEY_TO_ROUTE: Record<string, string> = {
  "1": "/",
  h: "/",
  "2": "/about",
  "3": "/blog",
  "4": "/projects",
};

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
        const next = cycleThemePreference(readThemePreference());
        applyThemePreference(next);
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
