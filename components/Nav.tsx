"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "HOME", keycap: "1" },
  { href: "/about", label: "ABOUT", keycap: "2" },
  { href: "/blog", label: "BLOG", keycap: "3" },
  { href: "/projects", label: "PROJECTS", keycap: "4" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="intro-nav font-brutal-mono fixed top-[clamp(1rem,3vw,2rem)] left-[clamp(1rem,3vw,2rem)] z-50 flex flex-col gap-2 text-[0.9rem] uppercase tracking-[0.08em]"
      aria-label="Main"
    >
      <div className="flex gap-[1rem]">
        {NAV_ITEMS.map(({ href, label, keycap }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <div key={href} className="group flex items-center gap-2">
              <Link
                href={href}
                className={
                  isActive
                    ? "inline-block border-2 border-[var(--color-fg)] bg-[var(--color-fg)] px-2 py-1 leading-none text-[var(--color-bg)] no-underline"
                    : "inline-block border-2 border-transparent border-b-[var(--color-fg)] px-2 py-1 leading-none text-[var(--color-fg)] no-underline"
                }
              >
                {label}
              </Link>
              <Link
                href={href}
                className={
                  isActive
                    ? "keycap keycap-hotkey keycap-active no-underline"
                    : "keycap keycap-hotkey no-underline"
                }
                aria-label={`Go to ${label}`}
              >
                {keycap}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
