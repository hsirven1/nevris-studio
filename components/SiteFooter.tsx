"use client";

import { useContact } from "@/components/ContactProvider";
import { site } from "@/content/site";

/**
 * Full-bleed black footer — calm close to the page.
 */
export function SiteFooter() {
  const { footer, email } = site;
  const { openContact } = useContact();

  return (
    <footer className="relative z-[5] w-full bg-ink text-[#e8e6e1]">
      <div className="gutter-x border-t border-white/10 pt-[clamp(2.75rem,6vh,3.75rem)] pb-[clamp(2.25rem,5vh,3rem)]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {/* Left — brand */}
          <div className="max-w-[22rem]">
            <p className="m-0 text-[15px] font-semibold tracking-[-0.02em] text-[#f2f1ec] md:text-[16px]">
              {footer.brand}
            </p>
            <p className="mt-2 mb-0 text-[13px] leading-[1.5] text-[#e8e6e1]/65 md:text-[14px]">
              {footer.descriptor}
            </p>
          </div>

          {/* Center — nav + social */}
          <div className="md:justify-self-center">
            <nav
              aria-label="Footer"
              className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2 md:flex-col md:gap-2.5 lg:flex-row lg:gap-x-7"
            >
              {footer.nav.map((item) =>
                item.href === "#contact" ? (
                  <button
                    key={item.href}
                    type="button"
                    onClick={openContact}
                    className="cursor-pointer border-0 bg-transparent p-0 text-left text-[13px] tracking-[0.01em] text-[#e8e6e1]/80 transition-colors duration-200 hover:text-[#f2f1ec] md:text-[14px]"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-[13px] tracking-[0.01em] text-[#e8e6e1]/80 transition-colors duration-200 hover:text-[#f2f1ec] md:text-[14px]"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {footer.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="font-mono text-[11px] tracking-[0.12em] text-[#e8e6e1]/45 uppercase transition-colors duration-200 hover:text-[#e8e6e1]/80"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — contact / legal */}
          <div className="md:justify-self-end md:text-right">
            <a
              href={`mailto:${email}`}
              className="block text-[13px] tracking-[0.01em] text-[#e8e6e1]/80 transition-colors duration-200 hover:text-[#f2f1ec] md:text-[14px]"
            >
              {email}
            </a>
            <p className="mt-2 mb-0 text-[13px] text-[#e8e6e1]/55 md:text-[14px]">
              {footer.location}
            </p>
            <p className="mt-4 mb-0 font-mono text-[11px] tracking-[0.1em] text-[#e8e6e1]/35">
              {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
