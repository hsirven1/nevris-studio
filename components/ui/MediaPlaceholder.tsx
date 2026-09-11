import type { CSSProperties } from "react";

type MediaPlaceholderProps = {
  label: string;
  className?: string;
  stripeA?: string;
  stripeB?: string;
  stripeStep?: number;
  solid?: string;
  /** Hide visible label (reference About portrait is stripe-only). */
  silent?: boolean;
};

export function MediaPlaceholder({
  label,
  className = "",
  stripeA,
  stripeB,
  stripeStep = 10,
  solid,
  silent = false,
}: MediaPlaceholderProps) {
  const style: CSSProperties = solid
    ? { background: solid }
    : ({
        ["--stripe-a"]: stripeA,
        ["--stripe-b"]: stripeB,
        ["--stripe-step"]: `${stripeStep}px`,
      } as CSSProperties);

  return (
    <div
      className={`flex items-end p-3.5 font-mono text-[10px] tracking-[0.14em] uppercase ${solid ? "" : "placeholder-stripe"} ${className}`}
      style={style}
      role="img"
      aria-label={label}
    >
      {!silent && <span>{label}</span>}
    </div>
  );
}
