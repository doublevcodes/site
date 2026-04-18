"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type IOSDeviceOrientationEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const MAX_TILT = 8;
const EASE = 0.035;
const PROJECT_NAMES = ["university prep edtech", "fintech agents", "model comparison tooling"] as const;
const TYPE_MS = 90;
const DELETE_MS = 55;
const HOLD_MS = 1100;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Hero() {
  const slabRef = useRef<HTMLDivElement | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [typedProject, setTypedProject] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const slab = slabRef.current;
    if (!slab) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let orientationListening = false;
    let firstTouchHandler: (() => Promise<void>) | null = null;

    const tick = () => {
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      slab.style.transform = `rotateX(${current.x}deg) rotateY(${current.y}deg) translateZ(0)`;
      slab.style.setProperty("--tilt-x", `${current.x}`);
      slab.style.setProperty("--tilt-y", `${current.y}`);
      frame = window.requestAnimationFrame(tick);
    };

    const onMouseMove = (event: MouseEvent) => {
      const x = ((event.clientY / window.innerHeight) - 0.5) * -2 * MAX_TILT;
      const y = ((event.clientX / window.innerWidth) - 0.5) * 2 * MAX_TILT;
      target.x = clamp(x, -MAX_TILT, MAX_TILT);
      target.y = clamp(y, -MAX_TILT, MAX_TILT);
    };

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta == null || event.gamma == null) return;
      target.x = clamp(-(event.beta / 45) * MAX_TILT, -MAX_TILT, MAX_TILT);
      target.y = clamp((event.gamma / 45) * MAX_TILT, -MAX_TILT, MAX_TILT);
    };

    const enableOrientation = () => {
      if (orientationListening) return;
      window.addEventListener("deviceorientation", onOrientation);
      orientationListening = true;
    };

    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (isFinePointer) {
      window.addEventListener("mousemove", onMouseMove);
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      const DeviceOrientation =
        DeviceOrientationEvent as IOSDeviceOrientationEvent;

      if (typeof DeviceOrientation.requestPermission === "function") {
        firstTouchHandler = async () => {
          try {
            const permission = await DeviceOrientation.requestPermission?.();
            if (permission === "granted") enableOrientation();
          } catch {
            // If permission fails or is blocked, hero remains static.
          }
        };

        document.addEventListener("touchstart", firstTouchHandler, {
          once: true,
        });
      } else {
        enableOrientation();
      }
    }

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onOrientation);
      if (firstTouchHandler) {
        document.removeEventListener("touchstart", firstTouchHandler);
      }
    };
  }, []);

  useEffect(() => {
    const currentWord = PROJECT_NAMES[projectIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedProject === currentWord) {
      timeoutId = setTimeout(() => setIsDeleting(true), HOLD_MS);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && typedProject === "") {
      setIsDeleting(false);
      setProjectIndex((current) => (current + 1) % PROJECT_NAMES.length);
      return;
    }

    timeoutId = setTimeout(() => {
      if (isDeleting) {
        setTypedProject((current) => current.slice(0, -1));
      } else {
        setTypedProject(currentWord.slice(0, typedProject.length + 1));
      }
    }, isDeleting ? DELETE_MS : TYPE_MS);

    return () => clearTimeout(timeoutId);
  }, [isDeleting, projectIndex, typedProject]);

  return (
    <section className="flex min-h-0 flex-1 flex-col px-4 sm:px-[clamp(1.25rem,4vw,4rem)]">
      <div
        className="shrink-0 min-h-[var(--site-header-h)]"
        aria-hidden
      />
      <div className="hero-slab-stage box-border flex min-h-0 w-full max-w-full flex-1 flex-col items-center justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-1 [perspective:1750px] [perspective-origin:50%_45%] sm:px-4 sm:pb-[clamp(0.6rem,2.5vw,2rem)] sm:pt-0 md:px-5">
        <div
          ref={slabRef}
          className="hero-slab w-full max-w-[1100px] border-4 border-[var(--color-fg)] bg-[var(--color-bg)] px-[clamp(0.85rem,3.2vw,5rem)] py-[clamp(0.85rem,3.2vw,5rem)] [transform-style:preserve-3d] [will-change:transform] md:border-[6px] md:px-[clamp(1.5rem,5vw,5rem)] md:py-[clamp(1.5rem,5vw,5rem)]"
          style={
            {
              "--tilt-x": "0",
              "--tilt-y": "0",
            } as CSSProperties
          }
        >
        <div className="hero-slab-depth" aria-hidden="true" />
        <div className="hero-slab-light" aria-hidden="true" />
        <div className="hero-slab-content">
          <div className="hero-photo-wrap intro-hero-subtitle" aria-hidden="true">
            <Image
              src="/images/vivaan-portrait.png"
              alt=""
              width={320}
              height={320}
              className="hero-photo"
              priority
            />
          </div>
          <div className="hero-slab-text">
            <h1 className="hero-slab-title intro-hero-title font-display m-0 text-[clamp(1.9rem,calc(0.88rem+7vw),18rem)] leading-[0.83] tracking-[0.01em] uppercase md:text-[clamp(3.25rem,calc(2rem+9vw),18rem)]">
              VIVAAN
            </h1>
            <p className="hero-slab-subtitle intro-hero-subtitle text-balance font-brutal-mono mt-[clamp(1rem,2vw,1.5rem)] mb-0 text-[clamp(0.9rem,1.4vw,1.25rem)] tracking-[0.06em] uppercase">
              <span className="hero-slab-line hero-slab-line--meta">
                17 • London<span className="max-md:hidden"> •</span>
              </span>{" "}
              <span className="hero-slab-line hero-slab-line--project">
                Building{" "}
                <span className="hero-project-name">{typedProject}</span>
                <span className="hero-cursor" aria-hidden="true">
                  _
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
