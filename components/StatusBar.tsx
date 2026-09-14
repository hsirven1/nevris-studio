"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useContact } from "@/components/ContactProvider";
import { site } from "@/content/site";

const capsuleChrome =
  "header-nav flex shrink-0 items-center rounded-full border border-ink bg-ground font-mono font-medium uppercase shadow-[0_8px_30px_rgba(17,17,16,0.14)]";

function CapsuleLinks() {
  const { openContact } = useContact();

  return (
    <>
      {site.nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="nav-link whitespace-nowrap px-4 py-2.5 sm:px-5 sm:py-3"
        >
          {item.label}
        </a>
      ))}
      <button
        type="button"
        onClick={openContact}
        className="nav-contact cursor-pointer rounded-full border-0 bg-ink px-5 py-2.5 whitespace-nowrap sm:px-6 sm:py-3"
      >
        Contact
      </button>
    </>
  );
}

function MobileMenu() {
  const { openContact } = useContact();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        type="button"
        className={`${capsuleChrome} cursor-pointer px-4 py-2.5 text-[12px] tracking-[0.14em]`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div
          id={menuId}
          className="absolute top-[calc(100%+10px)] right-0 z-30 flex min-w-[13.5rem] flex-col gap-0.5 rounded-[18px] border border-ink bg-ground p-2 text-[12px] tracking-[0.12em] shadow-[0_12px_36px_rgba(17,17,16,0.16)]"
          role="menu"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className="nav-link rounded-[12px] px-4 py-3"
              onClick={close}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              close();
              openContact();
            }}
            className="nav-contact cursor-pointer rounded-[12px] border-0 bg-ink px-4 py-3 text-left"
          >
            Contact
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function StatusBar() {
  return (
    <header className="relative z-[5] bg-transparent">
      <div className="gutter-x flex items-center justify-between gap-4 py-6 md:gap-6 md:py-[34px]">
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
            className="block h-[32px] w-auto md:h-[58px] lg:h-[64px]"
          />
          <span className="mt-[5px] font-mono text-[10px] leading-none font-medium tracking-[0.2em] text-ink uppercase md:mt-[6px] md:text-[12px] md:tracking-[0.24em] lg:text-[13px]">
            Product Studio
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className={`${capsuleChrome} hidden gap-1 py-[7px] pr-[7px] pl-2 text-[12px] tracking-[0.12em] md:flex md:text-[13px]`}
        >
          <CapsuleLinks />
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
