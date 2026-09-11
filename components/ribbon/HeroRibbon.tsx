"use client";

import { DEBUG_BASELINE } from "@/components/ribbon/NevrisRibbon";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import dynamic from "next/dynamic";
import { Component, useRef, type ReactNode } from "react";

const NevrisRibbonScene = dynamic(
  () =>
    import("@/components/ribbon/NevrisRibbonScene").then(
      (m) => m.NevrisRibbonScene,
    ),
  {
    ssr: false,
    loading: () => <RibbonFallback />,
  },
);

/**
 * Right-weighted hero ribbon — main body in the right third, thin tail left.
 */
export function HeroRibbon() {
  const reduce = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProgressRef.current = THREE_CLAMP01(v);
  });

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {!DEBUG_BASELINE && (
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[min(40%,30rem)] bg-gradient-to-r from-ground/90 from-[20%] via-ground/45 via-[65%] to-transparent max-md:w-[55%] max-md:from-ground max-md:via-ground/80" />
      )}

      <ErrorBoundary fallback={<RibbonFallback />}>
        <NevrisRibbonScene
          scrollProgressRef={scrollProgressRef}
          className={
            DEBUG_BASELINE
              ? "absolute inset-0 h-full w-full"
              : `absolute -top-[6%] -right-[8%] left-[8%] h-[114%] w-[106%] max-xl:left-[12%] max-md:left-0 max-md:-right-[12%] max-md:w-[108%] ${
                  reduce ? "opacity-90" : ""
                }`
          }
        />
      </ErrorBoundary>
    </div>
  );
}

function THREE_CLAMP01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function RibbonFallback() {
  return (
    <div className="absolute -top-[6%] -right-[10%] left-[10%] h-[112%] w-[98%] max-md:left-0 max-md:w-[108%]">
      <svg
        viewBox="0 0 800 600"
        className="h-full w-full"
        fill="none"
        aria-hidden
      >
        <path
          d="M200 310 C 340 240, 460 300, 540 290 C 620 280, 700 230, 820 200 L 800 350 C 680 380, 580 420, 500 400 C 420 380, 300 340, 180 380 Z"
          fill="#3a3348"
          opacity="0.7"
        />
        <path
          d="M220 330 C 350 270, 470 315, 545 308 C 620 300, 700 255, 800 230 L 785 320 C 680 345, 580 380, 505 365 C 430 350, 310 320, 205 355 Z"
          fill="#c9b6f7"
          opacity="0.42"
        />
      </svg>
    </div>
  );
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Swallow WebGL failures — static fallback renders instead
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}
