"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";

export type TransitionKind = "frames" | "crop" | "wipe";

const ProjectProgressContext = createContext<MotionValue<number> | null>(null);

export function useProjectProgress() {
  return useContext(ProjectProgressContext);
}

type ProjectTransitionProps = {
  kind: TransitionKind;
  children: ReactNode;
  className?: string;
};

/**
 * Scroll-driven section transitions.
 * Clip always starts partially open so content never vanishes.
 * Children can read progress via useProjectProgress().
 */
export function ProjectTransition({
  kind,
  children,
  className,
}: ProjectTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.28"],
  });

  const framesClip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(9% 14% 11% 10%)", "inset(0% 0% 0% 0%)"],
  );
  const cropClip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(16% 20% 16% 20%)", "inset(0% 0% 0% 0%)"],
  );
  const wipeClip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 0% 38%)", "inset(0% 0% 0% 0%)"],
  );

  const clipPath =
    kind === "frames" ? framesClip : kind === "crop" ? cropClip : wipeClip;

  const contentY = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0.85, 1, 1],
  );

  return (
    <ProjectProgressContext.Provider value={scrollYProgress}>
      <div ref={ref} className={className}>
        {reduce ? (
          <div>{children}</div>
        ) : (
          <motion.div
            style={{
              clipPath,
              y: contentY,
              opacity: contentOpacity,
            }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </ProjectProgressContext.Provider>
  );
}
