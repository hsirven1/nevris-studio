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
 * Full-scene sculptural loop — fills the hero visual layer without a clip box.
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
      className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
      aria-hidden
    >
      <ErrorBoundary fallback={<RibbonFallback />}>
        <NevrisRibbonScene
          scrollProgressRef={scrollProgressRef}
          className={
            DEBUG_BASELINE
              ? "absolute inset-0 h-full w-full"
              : `absolute inset-0 h-full w-full overflow-visible ${
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
    <div className="absolute inset-0 flex items-center justify-center overflow-visible">
      <svg
        viewBox="0 0 400 400"
        className="h-[min(72%,28rem)] w-[min(72%,28rem)]"
        fill="none"
        aria-hidden
      >
        <path
          d="M200 78 C 278 78, 336 128, 336 200 C 336 272, 278 322, 200 322 C 122 322, 64 272, 64 200 C 64 128, 122 78, 200 78 Z"
          fill="none"
          stroke="#7d99aa"
          strokeWidth="54"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M200 98 C 266 98, 314 140, 314 200 C 314 260, 266 302, 200 302 C 134 302, 86 260, 86 200 C 86 140, 134 98, 200 98 Z"
          fill="none"
          stroke="#ffc067"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M200 118 C 254 118, 292 152, 292 200 C 292 248, 254 282, 200 282 C 146 282, 108 248, 108 200 C 108 152, 146 118, 200 118 Z"
          fill="none"
          stroke="#66f4ff"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.4"
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
