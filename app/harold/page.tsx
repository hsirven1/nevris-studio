import type { Metadata } from "next";
import Link from "next/link";
import { harold } from "@/content/harold";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Harold Sirven — Product leader | Nevris Studio",
  description:
    "Harold Sirven is a product leader with 10+ years building digital products, AI experiences and new interfaces. Founder of Nevris Studio.",
};

const workOrder = ["fanstories", "ops", "juno", "lere"] as const;

export default function HaroldPage() {
  const { page, name, linkedin, email, resumeHref } = harold;
  const projects = workOrder
    .map((id) => featuredProjects.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="page-shell">
      <div className="nv-grain" aria-hidden />
      <div className="relative z-[4] bg-ground text-ink">
        <header className="gutter-x flex items-center justify-between py-7 md:py-9">
          <Link
            href="/"
            className="font-mono text-[12px] tracking-[0.08em] text-ink/65 transition-colors hover:text-ink"
          >
            ← Nevris Studio
          </Link>
          <a
            href={`mailto:${email}`}
            className="font-mono text-[11px] tracking-[0.12em] text-ink/45 uppercase transition-colors hover:text-ink/70"
          >
            {email}
          </a>
        </header>

        <section className="gutter-x pb-14 md:pb-20" aria-label="Introduction">
          <p className="m-0 font-mono text-[11px] tracking-[0.16em] text-ink-45 uppercase">
            Product leader
          </p>
          <h1 className="mt-4 mb-0 max-w-[14ch] text-[clamp(2.5rem,7vw,4.25rem)] leading-[0.95] font-extrabold tracking-[-0.04em]">
            {page.headline}
          </h1>
          <p className="mt-6 mb-0 max-w-[34rem] text-[1.25rem] leading-[1.35] font-medium tracking-[-0.02em] text-ink md:text-[1.4rem]">
            {page.subhead}
          </p>
          <p className="mt-4 mb-0 max-w-[34rem] text-[16px] leading-[1.5] text-ink/70 md:text-[17px]">
            {page.support}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="/#work"
              className="inline-flex rounded-full bg-ink px-5 py-2.5 font-mono text-[12px] tracking-[0.12em] text-ground uppercase transition-colors hover:bg-ink/90"
            >
              View selected work
            </a>
            {resumeHref ? (
              <a
                href={resumeHref}
                download
                className="inline-flex rounded-full border border-ink/25 px-5 py-2.5 font-mono text-[12px] tracking-[0.12em] text-ink uppercase transition-colors hover:border-ink/45"
              >
                Download résumé
              </a>
            ) : null}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-ink/25 px-5 py-2.5 font-mono text-[12px] tracking-[0.12em] text-ink uppercase transition-colors hover:border-ink/45"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <section
          className="border-t border-ink/15"
          aria-label="Selected work"
        >
          <div className="gutter-x py-12 md:py-16">
            <h2 className="m-0 font-mono text-[11px] tracking-[0.16em] text-ink-45 uppercase">
              Selected work
            </h2>
            <p className="mt-3 mb-0 max-w-[36rem] text-[15px] leading-[1.5] text-ink/65 md:text-[16px]">
              Independent products and commissions through Nevris Studio.
            </p>

            <ul className="mt-10 mb-0 flex list-none flex-col gap-0 p-0">
              {projects.map((project) => {
                if (!project) return null;
                return (
                  <li
                    key={project.id}
                    className="border-t border-ink/12 py-8 first:border-t-0 md:py-9"
                  >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10 lg:gap-14">
                      <div>
                        <h3 className="m-0 text-[1.65rem] leading-[1.05] font-bold tracking-[-0.03em] md:text-[1.85rem]">
                          {project.name}
                        </h3>
                        <p className="mt-3 mb-0 text-[15px] leading-[1.4] font-medium text-ink/80 md:text-[16px]">
                          {project.positioning}
                        </p>
                        {project.website ? (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block font-mono text-[12px] tracking-[0.1em] text-ink/60 uppercase underline decoration-ink/20 underline-offset-4 hover:text-ink hover:decoration-ink"
                          >
                            View project ↗
                          </a>
                        ) : null}
                      </div>
                      <div>
                        <p className="m-0 text-[15px] leading-[1.55] text-ink/70 md:text-[16px]">
                          {project.summary.split(/\n\n+/)[0]}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          className="border-t border-ink/15 bg-[#e7e5df]"
          aria-label="Experience"
        >
          <div className="gutter-x py-12 md:py-16">
            <h2 className="m-0 font-mono text-[11px] tracking-[0.16em] text-ink-45 uppercase">
              Experience
            </h2>
            <p className="mt-4 mb-0 max-w-[40rem] text-[17px] leading-[1.5] text-ink/80 md:text-[18px]">
              {page.experienceIntro}
            </p>
            <ul className="mt-8 mb-0 flex list-none flex-wrap gap-x-3 gap-y-2.5 p-0">
              {page.experienceHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-ink/15 bg-ground/60 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.1em] text-ink/70 uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="border-t border-ink/15"
          aria-label="Contact"
        >
          <div className="gutter-x py-14 md:py-20">
            <h2 className="m-0 max-w-[16ch] text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.05] font-bold tracking-[-0.035em]">
              {page.cta.title}
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              {page.cta.actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="inline-flex rounded-full bg-ink px-5 py-2.5 font-mono text-[12px] tracking-[0.12em] text-ground uppercase transition-colors hover:bg-ink/90"
                >
                  {action.label}
                </a>
              ))}
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-ink/25 px-5 py-2.5 font-mono text-[12px] tracking-[0.12em] text-ink uppercase transition-colors hover:border-ink/45"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex rounded-full border border-ink/25 px-5 py-2.5 font-mono text-[12px] tracking-[0.12em] text-ink uppercase transition-colors hover:border-ink/45"
              >
                Email
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-ink/15 bg-ink text-[#e8e6e1]">
          <div className="gutter-x flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[14px] font-semibold tracking-[-0.02em] text-[#f2f1ec]">
                {name}
              </p>
              <p className="mt-1 mb-0 text-[13px] text-[#e8e6e1]/55">
                Founder, {site.name}
              </p>
            </div>
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.12em] text-[#e8e6e1]/55 uppercase transition-colors hover:text-[#e8e6e1]/85"
            >
              ← Back to Nevris Studio
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
