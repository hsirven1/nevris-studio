"use client";

import { useId, useState, type ReactNode } from "react";

type MobileProjectExploreProps = {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "juno" | "lere";
};

const toneClass: Record<NonNullable<MobileProjectExploreProps["tone"]>, string> = {
  light:
    "border-ink/25 text-ink hover:border-ink/45 hover:bg-ink/[0.03]",
  dark:
    "border-white/25 text-[#f2f1ec] hover:border-white/45 hover:bg-white/[0.04]",
  juno:
    "border-juno-ink/25 text-juno-ink hover:border-juno-ink/45 hover:bg-juno-ink/[0.03]",
  lere:
    "border-lere-text/30 text-lere-text hover:border-lere-text/50 hover:bg-white/[0.04]",
};

/**
 * Progressive disclosure for mobile project case studies.
 * Mount only behind `md:hidden` — desktop stays on the approved layout.
 */
export function MobileProjectExplore({
  children,
  className = "",
  tone = "light",
}: MobileProjectExploreProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        className={`mt-7 inline-flex items-center gap-2 rounded-full border bg-transparent px-5 py-2.5 font-label text-[12px] tracking-[0.14em] uppercase transition-colors ${toneClass[tone]}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close project ↑" : "Explore project ↓"}
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
