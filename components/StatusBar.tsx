"use client";

import Link from "next/link";
import { useContact } from "@/components/ContactProvider";
import { site } from "@/content/site";

const capsuleChrome =
  "header-nav flex shrink-0 items-center rounded-full border border-ink bg-ground font-mono font-medium uppercase shadow-[0_8px_30px_rgba(17,17,16,0.14)]";

function CapsuleLinks({ compact = false }: { compact?: boolean }) {
  const { openContact } = useContact();
  const linkPad = compact
    ? "px-4 py-2.5"
    : "px-4 py-2.5 sm:px-5 sm:py-3";

  return (
    <>
      {site.nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`nav-link whitespace-nowrap ${linkPad}`}
        >
          {item.label}
        </a>
      ))}
      <button
        type="button"
        onClick={openContact}
        className={`nav-contact cursor-pointer rounded-full border-0 bg-ink whitespace-nowrap ${
          compact
            ? "mx-1.5 mb-1.5 px-4 py-2.5 text-center"
            : "px-5 py-2.5 sm:px-6 sm:py-3"
        }`}
      >
        Contact
      </button>
    </>
  );
}

export function StatusBar() {
  return (
    <header className="relative z-[5] bg-transparent">
      <div className="gutter-x flex items-center justify-between gap-4 py-[30px] sm:gap-6 sm:py-[34px]">
        <Link
          href="/"
          className="inline-flex shrink-0 flex-col items-start no-underline"
          aria-label="Nevris Studio home"
        >
          {/* Native img — tight crop so PRODUCT STUDIO aligns with the N */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/nevris-wordmark-v3.png"
            alt="Nevris"
            width={832}
            height={128}
            decoding="async"
            fetchPriority="high"
            className="block h-[34px] w-auto sm:h-[48px] md:h-[58px] lg:h-[64px]"
          />
          <span className="mt-[5px] font-mono text-[10px] leading-none font-medium tracking-[0.2em] text-ink uppercase sm:mt-[6px] sm:text-[11px] sm:tracking-[0.22em] md:text-[12px] md:tracking-[0.24em] lg:text-[13px]">
            Product Studio
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className={`${capsuleChrome} hidden gap-1 py-[7px] pr-[7px] pl-2 text-[12px] tracking-[0.12em] sm:flex sm:text-[13px]`}
        >
          <CapsuleLinks />
        </nav>

        <details className={`${capsuleChrome} relative sm:hidden`}>
          <summary className="flex cursor-pointer list-none items-center px-4 py-2.5 text-[12px] tracking-[0.12em] [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <div className="absolute top-[calc(100%+8px)] right-0 z-20 flex min-w-[12rem] flex-col gap-1 rounded-[20px] border border-ink bg-ground py-2 pr-1.5 pl-1.5 text-[12px] tracking-[0.12em] shadow-[0_8px_30px_rgba(17,17,16,0.14)]">
            <CapsuleLinks compact />
          </div>
        </details>
      </div>
    </header>
  );
}
