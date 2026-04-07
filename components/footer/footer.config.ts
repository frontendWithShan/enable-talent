export type FooterLinkItem = {
  label: string;
  href?: string;
  external?: boolean;
  description?: string;
};

export type FooterColumn = {
  heading: string;
  items: FooterLinkItem[];
};

export type FooterSocial = {
  name: string;
  iconSrc: string;
  href?: string;
  external?: boolean;
  description?: string;
};

export const FOOTER_HEADING_LINES = [
  "Building Global Infrastructure",
  "for Inclusive Employment",
];

export const FOOTER_PARAGRAPHS = [
  "An AI-powered workforce platform advancing equitable job access, intelligent hiring systems, and coordinated workforce integration across employers, institutions, and governments worldwide.",
  "Enabled Talent operates at the intersection of technology, policy, and workforce innovation, supporting scalable, standards-aligned inclusion across regions.",
];

export const FOOTER_CTA_LINES = [
  "Inclusive Success",
  "Starts with a Conversation.",
];

export const FOOTER_CTA_DESCRIPTION =
  "Whether you're hiring, job-seeking, or building inclusion into your programs, we're here to help you turn purpose into progress.";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Products",
    items: [
      { label: "For Talent", href: "/fortalents" },
      { label: "For Employers", href: "/foremployers" },
      { label: "For Educators" },
      { label: "For NGOs" },
      { label: "For Governments (Enabled Workforce Network (WIN))" },
      { label: "Enabled Jobs", href: "/foremployers" },
      { label: "Enabled Recruiter AI", href: "/foremployers/agent" },
    ],
  },
  {
    heading: "Our Initiatives",
    items: [
      { label: "Enabled Veterans" },
      { label: "ENABLE Canada Tour", href: "https://enablecanada.ca/" },
      { label: "Enabled Foundation" },
    ],
  },
  {
    heading: "Research, Policy & Knowledge",
    items: [
      { label: "Case Studies" },
      { label: "Guides" },
      { label: "Reports" },
      { label: "Webinars", href: "/events" },
      { label: "News & Insights", href: "/blogs" },
      { label: "Articles & Interviews" },
    ],
  },
  {
    heading: "Regional Platforms",
    items: [
      { label: "United States" },
      { label: "Africa", href: "/africa" },
      { label: "Spain" },
      { label: "Saudi Arabia" },
      { label: "Qatar" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About Enabled Talent", href: "/about-us" },
      { label: "Partner With Us" },
      { label: "Careers", href: "/careers" },
      { label: "Connect With Us" },
    ],
  },
  {
    heading: "Governance & Policies",
    items: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Accessibility Policy", href: "/accessibility-policy" },
      { label: "Responsible AI", href: "/responsible-ai" },
      { label: "Terms of Use", href: "/terms-of-use" },
    ],
  },
];

export const FOOTER_SOCIALS: FooterSocial[] = [
  {
    name: "LinkedIn",
    iconSrc: "/images/SectionFooter/linkedin.png",
    href: "https://www.linkedin.com/company/enabledtalent/posts/?feedView=all",
    external: true,
  },
  {
    name: "Instagram",
    iconSrc: "/images/SectionFooter/instagram.png",
    href: "https://www.instagram.com/enabledtalent/",
    external: true,
  },
  {
    name: "Facebook",
    iconSrc: "/images/SectionFooter/facebook.png",
    href: "https://www.facebook.com/people/Enabled-Talent/61586279129466/",
    external: true,
  },
  {
    name: "TikTok",
    iconSrc: "/images/SectionFooter/tiktok%20logo.png",
    href: "https://www.tiktok.com/@enabledtalent",
    external: true,
  },
];
