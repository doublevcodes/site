"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type BrutalScrollRevealProps = ComponentPropsWithoutRef<"section"> & {
  rootMargin?: string;
  threshold?: number;
};

export function BrutalScrollReveal({
  children,
  className = "",
  rootMargin = "0px 0px -11% 0px",
  threshold = 0.07,
  ...rest
}: BrutalScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        }
      },
      { root: null, rootMargin, threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold]);

  const wrapClass = `brutal-scroll-reveal-wrap${shown ? " brutal-scroll-reveal-wrap--shown" : ""}${className ? ` ${className}` : ""}`;

  return (
    <section ref={ref} className={wrapClass} {...rest}>
      {children}
    </section>
  );
}

type BrutalStaggerItemProps = {
  as?: "div" | "article" | "li";
  children: ReactNode;
  className?: string;
  index: number;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "style"> & {
  style?: CSSProperties;
};

export function BrutalStaggerItem({
  as,
  children,
  className = "",
  index,
  style,
  ...rest
}: BrutalStaggerItemProps) {
  const Tag = as ?? "div";
  const mergedStyle: CSSProperties = {
    ...style,
    ["--stagger-i" as string]: index,
  };

  return (
    <Tag
      className={`brutal-stagger-item${className ? ` ${className}` : ""}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
