"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

const Antigravity = dynamic(
  () => import("@/components/react-bits/Antigravity"),
  { ssr: false },
);

function subscribeDesktopCapable(onChange: () => void) {
  const narrow = window.matchMedia("(max-width: 767px)");
  const coarse = window.matchMedia("(pointer: coarse)");
  const reduceData = window.matchMedia("(prefers-reduced-data: reduce)");
  narrow.addEventListener("change", onChange);
  coarse.addEventListener("change", onChange);
  reduceData.addEventListener("change", onChange);
  return () => {
    narrow.removeEventListener("change", onChange);
    coarse.removeEventListener("change", onChange);
    reduceData.removeEventListener("change", onChange);
  };
}

function getDesktopCapableSnapshot() {
  return (
    !window.matchMedia("(max-width: 767px)").matches &&
    !window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(prefers-reduced-data: reduce)").matches
  );
}

/**
 * Antigravity field — fills the clipped hero zone only.
 */
export function HeroAntigravity() {
  const reduce = useReducedMotion();
  const capable = useSyncExternalStore(
    subscribeDesktopCapable,
    getDesktopCapableSnapshot,
    () => false,
  );

  if (reduce || !capable) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.55]"
      aria-hidden
    >
      <Antigravity
        className="h-full w-full"
        color="#D1BBF8"
        autoAnimate
        autoAnimateSpeed={0.26}
        count={260}
        magnetRadius={20}
        ringRadius={14}
        waveSpeed={0.2}
        waveAmplitude={0.6}
        particleSize={1.85}
        lerpSpeed={0.055}
        particleVariance={0.55}
        rotationSpeed={0.08}
        depthFactor={0.75}
        pulseSpeed={1.1}
        fieldStrength={8}
        particleShape="capsule"
      />
    </div>
  );
}
