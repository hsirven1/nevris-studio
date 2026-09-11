"use client";

import {
  AmbientDrift,
  useAllowPathMorph,
  usePointerParallax,
} from "@/components/motion/ambient";
import { motion, useReducedMotion } from "motion/react";

/**
 * Hero-only ground — lavender plane + contour, clipped by the hero zone
 * so nothing continues past the black “Discover our work” banner.
 */
export function SiteAtmosphere() {
  const reduce = useReducedMotion();
  const { x, y } = usePointerParallax(22);
  const morph = useAllowPathMorph();

  return (
    <motion.div
      className="nv-ground-field pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      style={reduce ? undefined : { x, y }}
    >
      <AmbientDrift
        amplitude={10}
        duration={28}
        className="absolute -top-[14%] -right-[20%] h-[108%] w-[64%] max-md:-top-[10%] max-md:-right-[28%] max-md:h-[90%] max-md:w-[78%]"
      >
        <div className="h-full w-full origin-top-right -rotate-[8deg] skew-x-[-2deg] bg-lavender opacity-[0.7] max-md:opacity-[0.48]" />
      </AmbientDrift>

      <AmbientDrift amplitude={6} duration={36} delay={1} className="absolute inset-0">
        <svg
          className="h-full w-full text-ink"
          viewBox="0 0 1440 920"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice"
        >
          <motion.path
            d="M-40 280 C 200 200, 420 360, 680 260 S 1100 160, 1520 280"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1.25"
            animate={
              morph
                ? {
                    d: [
                      "M-40 280 C 200 200, 420 360, 680 260 S 1100 160, 1520 280",
                      "M-40 300 C 220 220, 440 340, 700 280 S 1120 180, 1520 300",
                      "M-40 280 C 200 200, 420 360, 680 260 S 1100 160, 1520 280",
                    ],
                  }
                : undefined
            }
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M-40 560 C 220 500, 460 640, 740 560 S 1120 480, 1520 580"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1.15"
            animate={
              morph
                ? {
                    d: [
                      "M-40 560 C 220 500, 460 640, 740 560 S 1120 480, 1520 580",
                      "M-40 580 C 240 520, 480 620, 760 580 S 1140 500, 1520 560",
                      "M-40 560 C 220 500, 460 640, 740 560 S 1120 480, 1520 580",
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
