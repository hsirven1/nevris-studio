import { harold } from "@/content/harold";

/**
 * Compact founder note — studio remains primary.
 */
export function Founder() {
  const { founder, name, linkedin } = harold;

  return (
    <section
      id="founder"
      aria-label="Founder"
      className="border-t border-ink/15 bg-ground"
    >
      <div className="gutter-x py-12 md:py-[clamp(2.75rem,7vh,4.25rem)]">
        <div className="max-w-[38rem]">
          <p className="m-0 font-label text-[11px] tracking-[0.16em] text-ink-45 uppercase">
            {founder.eyebrow}
          </p>
          <h2 className="mt-3 mb-0 text-[1.85rem] leading-[1.05] font-bold tracking-[-0.035em] text-ink md:text-[2.25rem]">
            {name}
          </h2>
          <p className="mt-5 mb-0 text-[16px] leading-[1.55] text-ink/75 md:text-[17px]">
            {founder.bio}
          </p>
          <p className="mt-4 mb-0 text-[16px] leading-[1.55] text-ink/75 md:text-[17px]">
            {founder.continuation}
          </p>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-label text-[12px] tracking-[0.12em] text-ink/55 uppercase underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/45"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
