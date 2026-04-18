"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

type IOSDeviceOrientationEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const MAX_TILT = 8;
const EASE = 0.035;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type AboutTiltSlabProps = {
  children: React.ReactNode;
  className?: string;
};

export function AboutTiltSlab({ children, className = "" }: AboutTiltSlabProps) {
  const slabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slab = slabRef.current;
    if (!slab) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

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
            // slab stays at rest
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

  return (
    <div
      className={`mx-auto w-full max-w-[1100px] [perspective:1750px] [perspective-origin:50%_45%] ${className}`}
    >
      <div
        ref={slabRef}
        className="hero-slab border-[6px] border-[var(--color-fg)] bg-[var(--color-bg)] px-[clamp(1.25rem,4vw,2.75rem)] py-[clamp(1.25rem,4vw,2.75rem)] [transform-style:preserve-3d] [will-change:transform]"
        style={
          {
            "--tilt-x": "0",
            "--tilt-y": "0",
          } as CSSProperties
        }
      >
        <div className="hero-slab-depth" aria-hidden="true" />
        <div className="hero-slab-light" aria-hidden="true" />
        <div className="relative z-[2]">{children}</div>
      </div>
    </div>
  );
}
