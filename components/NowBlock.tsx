"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/doublevcodes",
    label: "GITHUB",
    keycap: "G",
    external: true,
  },
  {
    href: "https://linkedin.com/in/vivaanverma",
    label: "LINKEDIN",
    keycap: "L",
    external: true,
  },
  {
    href: "mailto:contact@vivaanverma.com",
    label: "EMAIL",
    keycap: "@",
    external: false,
  },
] as const;

export function NowBlock() {
  const [pendingLinkLabel, setPendingLinkLabel] = useState<string | null>(null);
  const pendingLink = useMemo(
    () => SOCIAL_LINKS.find((item) => item.label === pendingLinkLabel) ?? null,
    [pendingLinkLabel],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === "g") {
        event.preventDefault();
        setPendingLinkLabel("GITHUB");
      } else if (key === "l") {
        event.preventDefault();
        setPendingLinkLabel("LINKEDIN");
      } else if (event.key === "@") {
        event.preventDefault();
        setPendingLinkLabel("EMAIL");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onConfirm = useCallback(() => {
    if (!pendingLink) return;

    if (pendingLink.external) {
      window.open(pendingLink.href, "_blank", "noreferrer");
    } else {
      window.location.href = pendingLink.href;
    }
    setPendingLinkLabel(null);
  }, [pendingLink]);

  useEffect(() => {
    if (!pendingLink) return;

    const onModalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setPendingLinkLabel(null);
      } else if (event.key === "Enter") {
        event.preventDefault();
        onConfirm();
      }
    };

    window.addEventListener("keydown", onModalKeyDown);
    return () => window.removeEventListener("keydown", onModalKeyDown);
  }, [onConfirm, pendingLink]);

  return (
    <>
      <section
        className="intro-socials font-brutal-mono mx-auto w-[min(1100px,100%)] shrink-0 border-y-4 border-[var(--color-fg)] px-4 py-3 uppercase tracking-[0.05em]"
        aria-label="Social links"
      >
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[0.86rem] sm:text-[0.92rem]">
          {SOCIAL_LINKS.map(({ href, label, keycap, external }) => (
            <div key={label} className="group flex items-center gap-2">
              <Link
                href={href}
                className="inline-block border-2 border-transparent border-b-[var(--color-fg)] px-2 py-1 leading-none no-underline"
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                {label}
              </Link>
              <button
                type="button"
                className="keycap keycap-hotkey cursor-pointer"
                aria-label={`Open ${label}`}
                onClick={() => setPendingLinkLabel(label)}
              >
                {keycap}
              </button>
            </div>
          ))}
        </div>
      </section>

      {pendingLink && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="social-hotkey-title"
        >
          <div className="font-brutal-mono w-full max-w-md border-4 border-[var(--color-fg)] bg-[var(--color-bg)] p-4 uppercase">
            <p id="social-hotkey-title" className="m-0 text-sm tracking-[0.08em]">
              Open {pendingLink.label}?
            </p>
            <p className="mt-2 mb-4 text-xs tracking-[0.05em]">
              Continue to {pendingLink.href}
            </p>
            <div className="flex items-center gap-3 text-sm">
              <button
                type="button"
                className="cursor-pointer border-2 border-transparent border-b-[var(--color-fg)] px-2 py-1 leading-none"
                onClick={() => setPendingLinkLabel(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="cursor-pointer border-2 border-[var(--color-fg)] bg-[var(--color-fg)] px-2 py-1 leading-none text-[var(--color-bg)]"
                onClick={onConfirm}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
