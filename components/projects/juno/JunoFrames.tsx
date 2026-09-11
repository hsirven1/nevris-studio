import { ProductImage } from "@/components/projects/media/ProductImage";

type JunoStillProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  /** Soft window chrome above the still (desktop surfaces). */
  chrome?: boolean;
};

/**
 * Full still at native aspect — width/height from source, never cropped.
 */
export function JunoStill({
  src,
  alt,
  width,
  height,
  priority,
  className = "",
  chrome = false,
}: JunoStillProps) {
  const image = (
    <ProductImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className="product-still block h-auto w-full"
    />
  );

  if (!chrome) {
    return (
      <div
        className={`screenshot-frame overflow-hidden rounded-[1.25rem] bg-[#faf4ed] shadow-[0_18px_40px_-14px_rgba(55,28,20,0.42),0_6px_16px_-8px_rgba(55,28,20,0.2)] ring-1 ring-[rgba(55,28,20,0.08)] ${className}`}
      >
        {image}
      </div>
    );
  }

  return (
    <div
      className={`screenshot-frame overflow-hidden rounded-[1.35rem] bg-[#f7efe6] shadow-[0_22px_50px_-18px_rgba(55,28,20,0.38),0_8px_20px_-10px_rgba(55,28,20,0.18)] ring-1 ring-[rgba(55,28,20,0.1)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-[rgba(55,28,20,0.08)] bg-[#faf4ed] px-3.5 py-2.5">
        <span className="size-2 rounded-full bg-[#e8b4a8]" aria-hidden />
        <span className="size-2 rounded-full bg-[#e8d4a8]" aria-hidden />
        <span className="size-2 rounded-full bg-[#c8d8c0]" aria-hidden />
      </div>
      {image}
    </div>
  );
}
