"use client";

import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header
      className="site-header intro-nav box-border min-h-[var(--site-header-h)] border-b-2 border-[var(--color-fg)] bg-[var(--color-bg)] fixed inset-x-0 top-0 z-50"
      role="banner"
    >
      <div className="mx-auto flex min-h-[var(--site-header-h)] w-full max-w-[100vw] items-center justify-between gap-[clamp(0.75rem,2vw,1.25rem)] px-[clamp(1rem,3vw,2rem)] py-[clamp(0.4rem,1.1vw,0.6rem)]">
        <Nav />
        <ThemeToggle />
      </div>
    </header>
  );
}
