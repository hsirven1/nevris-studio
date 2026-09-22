"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

type ProjectSectionPlaneProps = {
  /** Which edge the plane anchors to */
  side: "left" | "right";
  /** Soft Nevris accent fill — e.g. bg-peach/45, bg-slate/30 */
  toneClass: string;
  /** Desktop structural block vs shorter mobile copy block */
  size?: "section" | "mobile";
  className?: string;
};

function planeGeometry(side: "left" | "right", size: "section" | "mobile") {
  const round =
    side === "left" ? "rounded-r-[2.75rem]" : "rounded-l-[2.75rem]";
  const edge = side === "left" ? "left-0 right-auto" : "right-0 left-auto";

  if (size === "mobile") {
    return `${edge} top-[7%] h-[46%] w-[82%] max-w-none ${round}`;
  }

  return `${edge} top-[5%] bottom-[5%] w-[min(52%,34rem)] md:top-[6%] md:bottom-[6%] md:w-[min(48%,40rem)] lg:w-[min(46%,42rem)] ${round}`;
}

/**
 * Mobile-only scroll-reactive plane. Desktop uses the static branch below.
 */
function MobileSectionPlane({
  side,
  toneClass,
  className,
}: {
  side: "left" | "right";
  toneClass: string;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -14]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    side === "left" ? [-6, 0, 5] : [6, 0, -5],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    side === "left" ? [-1.4, 0, 1.1] : [1.4, 0, -1.1],
  );

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute z-0 will-change-transform ${planeGeometry(side, "mobile")} ${toneClass} ${className}`}
      style={reduce ? undefined : { y, x, rotate }}
    />
  );
}

/**
 * One large structural accent block per project section.
 * Bleeds from the section edge; rounded only on the open side.
 */
export function ProjectSectionPlane({
  side,
  toneClass,
  size = "section",
  className = "",
}: ProjectSectionPlaneProps) {
  if (size === "mobile") {
    return (
      <MobileSectionPlane
        side={side}
        toneClass={toneClass}
        className={className}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 ${planeGeometry(side, "section")} ${toneClass} ${className}`}
    />
  );
}
