import type { ReactNode } from "react";

type ProjectTextPanelProps = {
  /** Soft Nevris accent fill — e.g. bg-peach/48 */
  toneClass: string;
  children: ReactNode;
  /** Grid-child classes (sticky, max-width) */
  className?: string;
  variant?: "desktop" | "mobile";
};

/**
 * Colored copy panel — sized to the text column so media never sits on it.
 * Bleeds to the section's left edge; its right inset must stay smaller than
 * the column gap so the media column keeps a clear gutter.
 */
export function ProjectTextPanel({
  toneClass,
  children,
  className = "",
  variant = "desktop",
}: ProjectTextPanelProps) {
  const shape =
    variant === "mobile"
      ? "-top-8 -bottom-9 left-[-1.25rem] -right-5 rounded-r-[2.25rem]"
      : "-top-10 -bottom-12 left-[calc(-1*var(--work-gutter))] -right-8 rounded-r-[2.75rem] xl:-right-10";

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className={`pointer-events-none absolute z-0 ${shape} ${toneClass}`}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
