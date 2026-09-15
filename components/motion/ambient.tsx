"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

type AmbientDriftProps = {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  style?: CSSProperties;
};

function subscribeNarrow(onChange: () => void) {
  const narrow = window.matchMedia("(max-width: 767px)");
  narrow.addEventListener("change", onChange);
  return () => narrow.removeEventListener("change", onChange);
}

function getNarrowSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function useIsNarrow() {
  return useSyncExternalStore(subscribeNarrow, getNarrowSnapshot, () => false);
}

function subscribeDesktopMotion(onChange: () => void) {
  const coarse = window.matchMedia("(pointer: coarse)");
  const narrow = window.matchMedia("(max-width: 767px)");
  coarse.addEventListener("change", onChange);
  narrow.addEventListener("change", onChange);
  return () => {
    coarse.removeEventListener("change", onChange);
    narrow.removeEventListener("change", onChange);
  };
}

function getDesktopMotionSnapshot() {
  return (
    !window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(max-width: 767px)").matches
  );
}

function useDesktopMotion() {
  return useSyncExternalStore(
    subscribeDesktopMotion,
    getDesktopMotionSnapshot,
    () => false,
  );
}

/** Slow continuous atmospheric drift. Reduced amplitude on mobile; off under reduced-motion. */
export function AmbientDrift({
  children,
  className,
  amplitude = 14,
  duration = 26,
  delay = 0,
  style,
}: AmbientDriftProps) {
  const reduce = useReducedMotion();
  const desktop = useDesktopMotion();
  const narrow = useIsNarrow();
  const allow = Boolean(!reduce && (desktop || narrow));
  const amp = narrow ? amplitude * 0.42 : amplitude;

  if (!allow) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        x: [0, amp * 0.55, -amp * 0.35, 0],
        y: [0, -amp * 0.4, amp * 0.25, 0],
      }}
      transition={{
        duration: narrow ? duration * 1.15 : duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/** Desktop-only pointer parallax; returns motion values for x/y. */
export function usePointerParallax(strength = 18) {
  const reduce = useReducedMotion();
  const desktop = useDesktopMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 40, damping: 28, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 40, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduce || !desktop) return;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(nx * strength);
      rawY.set(ny * strength * 0.65);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, desktop, rawX, rawY, strength]);

  return { x, y } as { x: MotionValue<number>; y: MotionValue<number> };
}

export function useAllowPathMorph() {
  const reduce = useReducedMotion();
  // Gentle contour morph on mobile too — no pointer dependency.
  return Boolean(!reduce);
}
