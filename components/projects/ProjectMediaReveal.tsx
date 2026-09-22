"use client";

import { useId, useState, type ReactNode } from "react";

type ProjectMediaRevealTone = "light" | "dark" | "juno";

type ProjectMediaRevealProps = {
  primary: ReactNode;
  secondary?: ReactNode;
  tone?: ProjectMediaRevealTone;
  className?: string;
};

const toneClass: Record<ProjectMediaRevealTone, string> = {
  light:
    "border-ink/55 bg-ink/[0.04] text-ink hover:border-ink hover:bg-ink/[0.08]",
  dark:
    "border-white/55 bg-white/[0.08] text-studio-text hover:border-white/80 hover:bg-white/[0.14]",
  juno:
    "border-juno-ink/50 bg-juno-ink/[0.05] text-juno-ink hover:border-juno-ink hover:bg-juno-ink/[0.1]",
};

/**
 * Primary project visual with optional secondary gallery behind “See more”.
 */
export function ProjectMediaReveal({
  primary,
  secondary,
  tone = "light",
  className = "",
}: ProjectMediaRevealProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const hasSecondary = Boolean(secondary);

  return (
    <div className={className}>
      <div>{primary}</div>

      {hasSecondary ? (
        <>
          <button
            type="button"
            className={`mt-7 inline-flex items-center gap-2.5 rounded-full border-2 px-6 py-3 font-label text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors md:mt-8 md:px-7 md:py-3.5 md:text-[14px] ${toneClass[tone]}`}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "See less ↑" : "See more ↓"}
          </button>

          <div
            id={panelId}
            className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
            aria-hidden={!open}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="pt-7">{secondary}</div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
