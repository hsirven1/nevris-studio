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
      className={`screenshot-frame overflow-hidden rounded-[0.85rem] bg-[#f4f3f0] shadow-[0_18px_44px_-20px_rgba(17,17,16,0.28),0_4px_14px_-6px_rgba(17,17,16,0.12)] ring-1 ring-ink/10 ${className}`}
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
