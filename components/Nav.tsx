"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const NAV_ITEMS = [
  { href: "/", label: "HOME", keycap: "1" },
  { href: "/about", label: "ABOUT", keycap: "2" },
  { href: "/projects", label: "PROJECTS", keycap: "3" },
];

const SHEET_TRANSITION_MS = 220;

function isActivePath(href: string, pathname: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [sheetShow, setSheetShow] = useState(false);
  const [sheetEnter, setSheetEnter] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [pressedKeycap, setPressedKeycap] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressedKeycapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const sheetWasOpenRef = useRef(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeSheet = useCallback(() => {
    clearCloseTimer();
    setSheetEnter(false);
    closeTimerRef.current = setTimeout(() => {
      setSheetShow(false);
      closeTimerRef.current = null;
    }, SHEET_TRANSITION_MS);
  }, [clearCloseTimer]);

  const openSheet = useCallback(() => {
    clearCloseTimer();
    setSheetShow(true);
    setSheetEnter(false);
  }, [clearCloseTimer]);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const onCrossMd = () => {
      if (!mq.matches) return;
      clearCloseTimer();
      setSheetEnter(false);
      setSheetShow(false);
    };
    mq.addEventListener("change", onCrossMd);
    return () => mq.removeEventListener("change", onCrossMd);
  }, [clearCloseTimer]);

  useLayoutEffect(() => {
    if (!sheetShow) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSheetEnter(true));
    });
    return () => cancelAnimationFrame(id);
  }, [sheetShow]);

  useEffect(() => {
    clearCloseTimer();
    setSheetEnter(false);
    setSheetShow(false);
  }, [pathname, clearCloseTimer]);

  useEffect(() => {
    if (!sheetShow) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSheet();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sheetShow, closeSheet]);

  useEffect(() => {
    if (!sheetShow) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetShow]);

  useEffect(() => {
    if (sheetShow && sheetEnter) {
      firstLinkRef.current?.focus();
    }
  }, [sheetShow, sheetEnter]);

  useEffect(() => {
    if (sheetWasOpenRef.current && !sheetShow) {
      menuButtonRef.current?.focus();
    }
    sheetWasOpenRef.current = sheetShow;
  }, [sheetShow]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    const onHotkeyPressed = (event: Event) => {
      const customEvent = event as CustomEvent<{ keycap?: string }>;
      const nextKeycap = customEvent.detail?.keycap;
      if (!nextKeycap) return;

      setPressedKeycap(nextKeycap);
      if (pressedKeycapTimerRef.current) {
        clearTimeout(pressedKeycapTimerRef.current);
      }
      pressedKeycapTimerRef.current = setTimeout(() => {
        setPressedKeycap(null);
        pressedKeycapTimerRef.current = null;
      }, 170);
    };

    window.addEventListener("nav-hotkey-pressed", onHotkeyPressed);
    return () => {
      window.removeEventListener("nav-hotkey-pressed", onHotkeyPressed);
      if (pressedKeycapTimerRef.current) {
        clearTimeout(pressedKeycapTimerRef.current);
        pressedKeycapTimerRef.current = null;
      }
    };
  }, []);

  const portal =
    portalReady &&
    sheetShow &&
    createPortal(
      <div className="md:hidden">
        <div
          role="presentation"
          className={`fixed inset-0 z-[100] cursor-default bg-[var(--color-fg)] transition-opacity duration-200 ease-out ${
            sheetEnter ? "opacity-40" : "opacity-0"
          }`}
          onClick={closeSheet}
        />
        <div
          id="mobile-nav-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className={`font-brutal-mono fixed inset-x-0 bottom-0 z-[101] max-h-[85vh] overflow-y-auto border-t-2 border-[var(--color-fg)] bg-[var(--color-bg)] px-[max(1rem,env(safe-area-inset-left,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-4 text-[0.9rem] uppercase tracking-[0.08em] shadow-[0_-8px_24px_rgba(0,0,0,0.12)] transition-transform duration-200 ease-out ${
            sheetEnter ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <nav aria-label="Main">
            <ul className="flex flex-col gap-0">
              {NAV_ITEMS.map(({ href, label, keycap }, index) => {
                const isActive = isActivePath(href, pathname);
                const isPressed = pressedKeycap === keycap;
                return (
                  <li
                    key={href}
                    className="border-b border-[var(--color-fg)] last:border-b-0"
                  >
                    <div className="flex items-center justify-between gap-3 py-3">
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={href}
                        onClick={closeSheet}
                        aria-current={isActive ? "page" : undefined}
                        className={
                          isActive
                            ? "coarse-tap-link inline-flex border-2 border-[var(--color-fg)] bg-[var(--color-fg)] px-3 py-2 leading-none text-[var(--color-bg)]"
                            : "coarse-tap-link inline-flex border-2 border-transparent px-3 py-2 leading-none text-[var(--color-fg)]"
                        }
                      >
                        {label}
                      </Link>
                      <span
                        className={
                          isActive
                            ? `keycap keycap-nav-hint keycap-active shrink-0${isPressed ? " keycap-pressed" : ""}`
                            : `keycap keycap-nav-hint shrink-0${isPressed ? " keycap-pressed" : ""}`
                        }
                        aria-hidden="true"
                      >
                        {keycap}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>,
      document.body,
    );

  return (
    <div className="flex min-w-0 flex-1 items-center">
      <nav
        className="font-brutal-mono hidden min-w-0 flex-1 items-center overflow-x-auto text-[0.9rem] uppercase tracking-[0.08em] [-ms-overflow-style:none] [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden"
        aria-label="Main"
      >
        <div className="flex min-w-max gap-[1.75rem] pr-1">
          {NAV_ITEMS.map(({ href, label, keycap }) => {
            const isActive = isActivePath(href, pathname);
            const isPressed = pressedKeycap === keycap;
            return (
              <div key={href} className="group flex items-center gap-1 md:gap-2">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "coarse-tap-link inline-block border-2 border-[var(--color-fg)] bg-[var(--color-fg)] px-2 py-1 leading-none text-[var(--color-bg)]"
                      : "coarse-tap-link inline-block border-2 border-transparent px-2 py-1 leading-none text-[var(--color-fg)]"
                  }
                >
                  {label}
                </Link>
                <span
                  className={
                    isActive
                      ? `keycap keycap-nav-hint keycap-active max-md:!hidden${isPressed ? " keycap-pressed" : ""}`
                      : `keycap keycap-nav-hint max-md:!hidden${isPressed ? " keycap-pressed" : ""}`
                  }
                  aria-hidden="true"
                >
                  {keycap}
                </span>
              </div>
            );
          })}
        </div>
      </nav>

      <button
        ref={menuButtonRef}
        type="button"
        className="coarse-tap-link font-brutal-mono cursor-pointer border-2 border-transparent px-2 py-1 text-[0.9rem] leading-none uppercase tracking-[0.08em] hover:underline md:hidden"
        aria-label="Open menu"
        aria-expanded={sheetShow && sheetEnter}
        aria-controls="mobile-nav-sheet"
        onClick={() => (sheetShow ? closeSheet() : openSheet())}
      >
        MENU
      </button>

      {portal}
    </div>
  );
}
