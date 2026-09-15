"use client";

import {
  AmbientDrift,
  useAllowPathMorph,
  usePointerParallax,
} from "@/components/motion/ambient";
import { motion, useReducedMotion } from "motion/react";

/**
 * Minimal hero ground — quiet contour lines only.
 * No large circular fields competing with the sculpture.
 */
export function SiteAtmosphere() {
  const reduce = useReducedMotion();
  const { x, y } = usePointerParallax(14);
  const morph = useAllowPathMorph();

  return (
    <motion.div
      className="nv-ground-field pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      style={reduce ? undefined : { x, y }}
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
