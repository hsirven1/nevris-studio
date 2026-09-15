import Link from "next/link";
import { harold } from "@/content/harold";

/**
 * Compact founder-led section — studio remains primary; Harold is the person behind it.
 */
export function Founder() {
  const { founder, name, linkedin, aboutHref, resumeHref } = harold;

  return (
    <section
      id="founder"
      aria-label="Founder"
      className="border-t border-ink/15 bg-ground"
    >
      <div className="gutter-x py-14 md:py-[clamp(3.5rem,8vh,5rem)]">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.7fr)] md:gap-14 lg:gap-20">
          <div className="min-w-0 max-w-[38rem]">
            <p className="m-0 font-mono text-[11px] tracking-[0.16em] text-ink-45 uppercase">
              {founder.eyebrow}
            </p>
            <h2 className="mt-3 mb-0 text-[1.85rem] leading-[1.1] font-bold tracking-[-0.03em] text-ink md:text-[2.15rem]">
              {name}
            </h2>
            <p className="mt-5 mb-0 text-[16px] leading-[1.55] text-ink/75 md:text-[17px]">
              {founder.bio}
            </p>
            <p className="mt-4 mb-0 text-[16px] leading-[1.55] text-ink/75 md:text-[17px]">
              {founder.continuation}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-[0.12em] text-ink/70 uppercase underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                LinkedIn
              </a>
              <Link
                href={aboutHref}
                className="font-mono text-[12px] tracking-[0.12em] text-ink/70 uppercase underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                About Harold
              </Link>
              {resumeHref ? (
                <a
                  href={resumeHref}
                  download
                  className="font-mono text-[12px] tracking-[0.12em] text-ink/70 uppercase underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                >
                  Download résumé
                </a>
              ) : null}
            </div>
          </div>

          <div
            className="relative mx-auto aspect-[4/5] w-full max-w-[14rem] overflow-hidden rounded-[0.15rem] bg-[linear-gradient(145deg,#ebe4d8_0%,#f6f1e6_40%,#ffe2b3_78%,#d4eeff_120%)] md:mx-0 md:max-w-[16rem] md:justify-self-end"
            aria-hidden
          >
            <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,rgba(17,17,16,0.18)_1px,transparent_0)] [background-size:14px_14px]" />
            <div className="absolute inset-0 flex items-end p-5">
              <span className="font-serif text-[3.5rem] leading-none tracking-[-0.04em] text-ink/25">
                HS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
