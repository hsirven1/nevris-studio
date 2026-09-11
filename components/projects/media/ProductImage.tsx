import type { CSSProperties } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
  /**
   * Kept for call-site compatibility. Portfolio stills always use the original
   * file (no Next optimizer) so UI text stays sharp.
   */
  crisp?: boolean;
};

/**
 * Portfolio UI screenshots — always load the original asset via <img>.
 *
 * next/image recompression (even at q=95) and `fill` wrapper quirks soften
 * text-heavy product UI. Prefer this for all case-study stills.
 */
export function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  priority,
  className = "",
  style,
  "aria-hidden": ariaHidden,
}: ProductImageProps) {
  const shared = {
    src,
    alt,
    decoding: "async" as const,
    ...(priority
      ? ({ fetchPriority: "high" } as const)
      : ({ loading: "lazy" } as const)),
    ...(ariaHidden !== undefined ? { "aria-hidden": ariaHidden } : {}),
  };

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...shared}
        className={`product-still absolute inset-0 h-full w-full ${className}`}
        style={style}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...shared}
      width={width}
      height={height}
      className={`product-still ${className}`}
      style={style}
    />
  );
}
