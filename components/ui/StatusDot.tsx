import type { DotTone } from "@/content/types";

const tones: Record<DotTone, string> = {
  live: "bg-live",
  lavender: "bg-lavender",
  ink: "bg-ink",
  light: "bg-lere-text",
};

type StatusDotProps = {
  tone?: DotTone;
  pulse?: boolean;
  size?: 7 | 8;
  className?: string;
};

export function StatusDot({
  tone = "live",
  pulse = false,
  size = 7,
  className = "",
}: StatusDotProps) {
  const dim = size === 8 ? "h-2 w-2" : "h-[7px] w-[7px]";
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 rounded-full ${dim} ${tones[tone]} ${pulse ? "nv-pulse" : ""} ${className}`}
    />
  );
}
