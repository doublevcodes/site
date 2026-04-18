"use client";

import { useCallback, useEffect, useState } from "react";

const SCROLL_DISMISS_PX = 40;

function scrollDownChunk() {
  const vh = window.innerHeight;
  const delta = Math.round(Math.min(Math.max(vh * 0.42, 240), 520));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollBy({ top: delta, behavior: reduce ? "auto" : "smooth" });
}

export function AboutScrollHint() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= SCROLL_DISMISS_PX) setDismissed(true);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = useCallback(() => {
    scrollDownChunk();
  }, []);

  if (dismissed) return null;

  return (
    <button
      type="button"
      className="about-scroll-hint self-center"
      aria-label="Scroll down the page"
      onClick={onClick}
    >
      <span className="about-scroll-hint-label">SCROLL</span>
      <span className="about-scroll-hint-chev" aria-hidden="true">
        ▼
      </span>
    </button>
  );
}
