import type { CSSProperties } from "react";

const TAPE_YELLOW = "#f9d74c";
const TAPE_BLACK = "#0a0a0a";

const stripeStyle: CSSProperties = {
  backgroundColor: TAPE_YELLOW,
  backgroundImage: `repeating-linear-gradient(
    45deg,
    ${TAPE_BLACK} 0,
    ${TAPE_BLACK} 18px,
    ${TAPE_YELLOW} 18px,
    ${TAPE_YELLOW} 36px
  )`,
};

export function BlogConstructionTape() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 flex w-[max(260vmin,245vmax)] -translate-x-1/2 -translate-y-1/2 -rotate-[32deg] flex-col border-y-4 border-black"
        style={{
          height: "clamp(7.5rem, 20vmin, 15rem)",
          backgroundColor: TAPE_YELLOW,
          boxShadow:
            "0 0 0 3px #000, 0 10px 24px rgb(0 0 0 / 0.35), inset 0 1px 0 rgb(255 255 255 / 0.35)",
        }}
      >
        <div
          className="shrink-0 border-b-2 border-black"
          style={{
            ...stripeStyle,
            height: "clamp(1.35rem, 4.5vmin, 2.75rem)",
          }}
        />
        <div
          className="flex min-h-0 flex-1 items-center justify-center border-y-2 border-black px-4"
          style={{ backgroundColor: TAPE_YELLOW }}
        >
          <span
            className="text-center font-sans font-black uppercase text-black"
            style={{
              fontSize: "clamp(1.65rem, 5.2vmin, 3.85rem)",
              letterSpacing: "0.04em",
              lineHeight: 1.05,
            }}
          >
            UNDER CONSTRUCTION
          </span>
        </div>
        <div
          className="shrink-0 border-t-2 border-black"
          style={{
            ...stripeStyle,
            height: "clamp(1.35rem, 4.5vmin, 2.75rem)",
          }}
        />
      </div>
    </div>
  );
}
