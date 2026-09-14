import { ProductImage } from "@/components/projects/media/ProductImage";
import type { ReactNode } from "react";

/** Constrained mobile product visual — preserves aspect, caps height. */
export function MobileVisual({
  children,
  className = "",
  maxHeightClass = "max-h-[58vh]",
}: {
  children: ReactNode;
  className?: string;
  maxHeightClass?: string;
}) {
  return (
    <div
      className={`mobile-visual relative mx-auto w-full overflow-hidden ${maxHeightClass} ${className}`}
    >
      {children}
    </div>
  );
}

export function MobileStill({
  src,
  alt,
  width,
  height,
  priority,
  className = "",
  frameClassName = "rounded-[1rem] bg-[#f4f3f0] shadow-[0_14px_36px_-16px_rgba(17,17,16,0.28)] ring-1 ring-ink/10",
  maxHeightClass = "max-h-[58vh]",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  frameClassName?: string;
  maxHeightClass?: string;
}) {
  return (
    <div className={`overflow-hidden ${frameClassName} ${className}`}>
      <MobileVisual maxHeightClass={maxHeightClass}>
        <ProductImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="product-still mx-auto block h-auto max-h-[inherit] w-full object-contain"
        />
      </MobileVisual>
    </div>
  );
}
