"use client";

import Image from "next/image";
import Link from "next/link";
import { useContact } from "@/components/ContactProvider";
import { site } from "@/content/site";

function FooterBrand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 flex-col items-start no-underline ${className}`}
      aria-label="Nevris Studio home"
    >
      <Image
        src="/brand/nevris-header-on-dark.png"
        alt="Nevris"
        width={512}
        height={153}
        unoptimized
        className="h-[2.5rem] w-auto md:h-[3.25rem] lg:h-[3.5rem]"
      />
      <span className="font-label mt-[7px] text-[11px] leading-none font-medium tracking-[0.2em] text-[#e8e6e1]/55 uppercase md:mt-[9px] md:text-[13px] md:tracking-[0.22em]">
        Product Studio
      </span>
    </Link>
  );
}

/**
 * Full-bleed black footer — calm close to the page.
 */
export function SiteFooter() {
  const { footer } = site;
  const { openContact } = useContact();

  return (
    <footer className="relative z-[5] w-full bg-ink text-[#e8e6e1]">
      <div className="gutter-x border-t border-white/10 pt-12 pb-10 md:pt-[clamp(2.75rem,6vh,3.75rem)] md:pb-[clamp(2.25rem,5vh,3rem)]">
        {/* Mobile stack */}
        <div className="flex flex-col gap-8 md:hidden">
          <FooterBrand />

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            {footer.nav.map((item) =>
              item.href === "#contact" ? (
                <button
                  key={item.href}
                  type="button"
                  onClick={openContact}
                  className="cursor-pointer border-0 bg-transparent p-0 text-left text-[14px] text-[#e8e6e1]/80"
                >
                  {item.label}
                </button>
              ) : item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[14px] text-[#e8e6e1]/80"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[14px] text-[#e8e6e1]/80"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="font-label text-[11px] tracking-[0.12em] text-[#e8e6e1]/45 uppercase"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div>
            <p className="m-0 text-[13px] text-[#e8e6e1]/55">{footer.location}</p>
            <p className="mt-2 mb-0 font-label text-[11px] tracking-[0.1em] text-[#e8e6e1]/35">
              {footer.copyright}
            </p>
          </div>
        </div>

        {/* Desktop — 3-col */}
        <div className="hidden grid-cols-1 gap-10 md:grid md:grid-cols-3 md:gap-8 lg:gap-12">
          <div className="max-w-[22rem]">
            <FooterBrand />
          </div>

          <div className="md:justify-self-center">
            <nav
              aria-label="Footer"
              className="flex flex-col gap-2.5 md:gap-2.5 lg:flex-row lg:flex-wrap lg:gap-x-7"
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
                ) : item.href.startsWith("/") ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[13px] tracking-[0.01em] text-[#e8e6e1]/80 transition-colors duration-200 hover:text-[#f2f1ec] md:text-[14px]"
                  >
                    {item.label}
                  </Link>
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
                  className="font-label text-[11px] tracking-[0.12em] text-[#e8e6e1]/45 uppercase transition-colors duration-200 hover:text-[#e8e6e1]/80"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:justify-self-end md:text-right">
            <p className="m-0 text-[13px] text-[#e8e6e1]/55 md:text-[14px]">
              {footer.location}
            </p>
            <p className="mt-4 mb-0 font-label text-[11px] tracking-[0.1em] text-[#e8e6e1]/35">
              {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
