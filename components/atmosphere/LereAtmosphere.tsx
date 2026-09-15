"use client";

import { AmbientDrift } from "@/components/motion/ambient";
import { useProjectProgress } from "@/components/motion/ProjectTransition";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

/**
 * Grand Angle — chalk / slate / warm washes as square, axis-aligned blocks.
 */
export function LereAtmosphere() {
  const reduce = useReducedMotion();
  const progress = useProjectProgress();
  const fallback = useMotionValue(1);
  const p = progress ?? fallback;

  const planeX = useTransform(p, [0, 1], ["-4%", "3%"]);
  const warmX = useTransform(p, [0, 1], ["5%", "-2%"]);
  const frameInset = useTransform(p, [0, 1], [22, 12]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Soft chalk plane behind product visuals */}
      <AmbientDrift
        amplitude={10}
        duration={28}
        className="absolute top-[4%] right-[-8%] h-[62%] w-[48%] max-md:right-[-14%] max-md:w-[58%]"
      >
        <motion.div
          className="h-full w-full rounded-none bg-[rgba(239,239,234,0.055)] max-md:opacity-80"
          style={reduce ? undefined : { x: planeX }}
        />
      </AmbientDrift>

      {/* Cool slate wash — exhibition air */}
      <AmbientDrift
        amplitude={8}
        duration={30}
        delay={1}
        className="absolute top-[28%] left-[-10%] h-[48%] w-[38%] max-md:hidden"
      >
        <motion.div
          className="h-full w-full rounded-none bg-[rgba(120,145,160,0.11)]"
          style={reduce ? undefined : { x: warmX }}
        />
      </AmbientDrift>

      {/* Warm print accent — square, distant */}
      <AmbientDrift
        amplitude={7}
        duration={34}
        delay={0.4}
        className="absolute right-[12%] bottom-[-10%] h-[40%] w-[34%] max-md:hidden"
      >
        <div className="h-full w-full rounded-none bg-[rgba(176,148,118,0.12)]" />
      </AmbientDrift>

      {/* Quiet crop marks — gallery framing */}
      <AmbientDrift amplitude={4} duration={32} className="absolute inset-0 max-md:hidden">
        <motion.div
          className="absolute border-t border-l border-[rgba(239,239,234,0.28)]"
          style={{
            top: frameInset,
            left: frameInset,
            width: 28,
            height: 28,
          }}
        />
        <motion.div
          className="absolute border-t border-r border-[rgba(239,239,234,0.28)]"
          style={{
            top: frameInset,
            right: frameInset,
            width: 28,
            height: 28,
          }}
        />
        <motion.div
          className="absolute border-b border-l border-[rgba(239,239,234,0.28)]"
          style={{
            bottom: frameInset,
            left: frameInset,
            width: 28,
            height: 28,
          }}
        />
        <motion.div
          className="absolute border-r border-b border-[rgba(239,239,234,0.28)]"
          style={{
            right: frameInset,
            bottom: frameInset,
            width: 28,
            height: 28,
          }}
        />
      </AmbientDrift>

      {/* Soft vignette — keeps the eye on the work */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 720"
        fill="none"
        preserveAspectRatio="none"
      >
        <rect x="0" y="0" width="1440" height="720" fill="url(#lereAtmoVignette)" />
        <defs>
          <radialGradient id="lereAtmoVignette" cx="58%" cy="42%" r="68%">
            <stop offset="45%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(20,24,26,0.42)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
