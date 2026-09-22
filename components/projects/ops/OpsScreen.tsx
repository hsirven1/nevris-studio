import { ProductImage } from "@/components/projects/media/ProductImage";

/** Clean product screen — subtle depth, no fake OS chrome. */
export function OpsScreen({
  src,
  alt,
  sizes,
  priority,
  className = "",
  aspectClass = "aspect-[2906/1628]",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  aspectClass?: string;
}) {
  return (
    <div
      className={`screenshot-frame overflow-hidden rounded-[0.85rem] bg-[#1a1a18] shadow-[0_20px_48px_-22px_rgba(0,0,0,0.55),0_4px_14px_-8px_rgba(0,0,0,0.35)] ring-1 ring-white/10 ${className}`}
    >
      <div className={`relative w-full ${aspectClass}`}>
        <ProductImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}
