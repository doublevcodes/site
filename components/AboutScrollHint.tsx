"use client";

import { useEffect, useState } from "react";

const SCROLL_DISMISS_PX = 40;

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

  if (dismissed) return null;

  return (
    <div
      className="about-scroll-hint self-center"
      role="status"
      aria-label="Scroll down for more on this page"
    >
      <span className="about-scroll-hint-label">SCROLL</span>
      <span className="about-scroll-hint-chev" aria-hidden="true">
        ▼
      </span>
    </div>
  );
}
