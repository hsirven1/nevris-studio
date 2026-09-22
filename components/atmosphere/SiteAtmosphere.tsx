"use client";

import {
  AmbientDrift,
  useAllowPathMorph,
  usePointerParallax,
} from "@/components/motion/ambient";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useSyncExternalStore } from "react";

function subscribeNarrow(onChange: () => void) {
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getNarrowSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Minimal hero ground — quiet contour lines only.
 * No large circular fields competing with the sculpture.
 * Mobile: scroll-driven drift replaces desktop pointer parallax.
 */
export function SiteAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isNarrow = useSyncExternalStore(
    subscribeNarrow,
    getNarrowSnapshot,
    () => false,
  );
  const { x, y } = usePointerParallax(14);
  const morph = useAllowPathMorph();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const scrollX = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const style =
    reduce
      ? undefined
      : isNarrow
        ? { x: scrollX, y: scrollY }
        : { x, y };

  return (
    <motion.div
      ref={ref}
      className="nv-ground-field pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      style={style}
    >
      <AmbientDrift amplitude={5} duration={36} delay={1} className="absolute inset-0">
        <svg
          className="h-full w-full text-ink"
          viewBox="0 0 1440 920"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice"
        >
          <motion.path
            d="M-40 300 C 220 240, 480 360, 720 280 S 1100 200, 1520 300"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1.15"
            animate={
              morph
                ? {
                    d: [
                      "M-40 300 C 220 240, 480 360, 720 280 S 1100 200, 1520 300",
                      "M-40 320 C 240 260, 500 340, 740 300 S 1120 220, 1520 320",
                      "M-40 300 C 220 240, 480 360, 720 280 S 1100 200, 1520 300",
                    ],
                  }
                : undefined
            }
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M-40 640 C 260 580, 520 700, 780 620 S 1140 540, 1520 640"
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1.05"
            animate={
              morph
                ? {
                    d: [
                      "M-40 640 C 260 580, 520 700, 780 620 S 1140 540, 1520 640",
                      "M-40 660 C 280 600, 540 680, 800 640 S 1160 560, 1520 620",
                      "M-40 640 C 260 580, 520 700, 780 620 S 1140 540, 1520 640",
                    ],
                  }
                : undefined
            }
            transition={{
              duration: 34,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />
        </svg>
      </AmbientDrift>
    </motion.div>
  );
}
