import type { ReactNode } from "react";

type ProjectLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M3.5 8.5 L8.5 3.5 M4.75 3.5 H8.5 V7.25"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Consistent project CTA with SVG external arrow — no emoji glyphs.
 */
export function ProjectLink({
  href,
  children,
  className = "",
  muted = false,
}: ProjectLinkProps) {
  if (muted) {
    return (
      <span className={`project-link-muted inline-flex items-center gap-1.5 ${className}`}>
        {children}
      </span>
    );
  }

  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className={`project-link inline-flex items-center gap-1.5 ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {external ? (
        <ExternalArrow className="size-[0.78em] shrink-0 translate-y-[-0.02em] opacity-80" />
      ) : null}
    </a>
  );
}
