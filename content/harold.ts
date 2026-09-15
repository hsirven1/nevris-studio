import { site } from "@/content/site";

export const harold = {
  name: "Harold Sirven",
  title: "Product leader and builder",
  location: "Montréal, Canada",
  email: site.email,
  linkedin:
    site.footer.social.find((s) => s.label === "LinkedIn")?.href ??
    "https://www.linkedin.com/",
  github:
    site.footer.social.find((s) => s.label === "GitHub")?.href ??
    "https://github.com/",
  /** Set to e.g. "/harold/harold-sirven-resume.pdf" once the file is in /public. */
  resumeHref: undefined as string | undefined,
  aboutHref: "/harold",

  founder: {
    eyebrow: "Founder",
    bio: "Product leader and builder with 10+ years of experience creating digital products across consumer, platform and AI experiences.",
    continuation:
      "Nevris is where that work continues through independent products, experiments and selected client projects.",
  },

  page: {
    headline: "Harold Sirven",
    subhead:
      "Product leader building digital products, AI experiences and new interfaces.",
    support:
      "10+ years across consumer products, platforms and AI-enabled experiences.",
    experienceIntro:
      "10+ years building digital products, from large-scale consumer experiences to AI-enabled tools and new product concepts.",
    experienceHighlights: [
      "Product leadership",
      "Consumer and B2B products",
      "AI / ML product work",
      "Platform and data products",
      "0→1 product development",
    ],
    cta: {
      title: "Interested in working together?",
      actions: [
        {
          label: "Full-time opportunities",
          href: "mailto:hello@nevris.studio?subject=Full-time%20opportunity",
        },
        {
          label: "Consulting / product work",
          href: "mailto:hello@nevris.studio?subject=Consulting%20%2F%20product%20work",
        },
      ],
    },
  },
};
