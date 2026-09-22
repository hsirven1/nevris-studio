type ProjectSectionPlaneProps = {
  /** Which edge the plane anchors to */
  side: "left" | "right";
  /** Soft Nevris accent fill — e.g. bg-peach/45, bg-slate/30 */
  toneClass: string;
  /** Desktop structural block vs shorter mobile copy block */
  size?: "section" | "mobile";
  className?: string;
};

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
  const round =
    side === "left" ? "rounded-r-[2.75rem]" : "rounded-l-[2.75rem]";
  const edge = side === "left" ? "left-0 right-auto" : "right-0 left-auto";

  const geometry =
    size === "mobile"
      ? `${edge} top-[7%] h-[46%] w-[82%] max-w-none ${round}`
      : `${edge} top-[5%] bottom-[5%] w-[min(52%,34rem)] md:top-[6%] md:bottom-[6%] md:w-[min(48%,40rem)] lg:w-[min(46%,42rem)] ${round}`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 ${geometry} ${toneClass} ${className}`}
    />
  );
}
