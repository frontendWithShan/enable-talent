"use client";

import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import ComingSoonModal from "@/components/ComingSoonModal";
import DemoRequestModal from "@/components/DemoRequestModal";

const footerColumns = [
  {
    heading: "Product",
    items: [
      "For Talent",
      "Career Coach",
      "Enabled Jobs",
      "Enabled AI Agent",
      "Enabled Academy",
      "For Educators",
      "For NGOs",
      "For Governments",
    ],
  },
  {
    heading: "Case Studies",
    items: ["Durham"],
  },
  {
    heading: "Countries",
    items: ["EnabledAfrica", "Spain"],
  },
  {
    heading: "Resources",
    items: ["Blog", "FAQs"],
  },
  {
    heading: "Company",
    items: ["About", "Partners", "Careers"],
  },
  {
    heading: "Legal",
    items: [
      "Privacy Policy",
      "Accessibility Policy",
      "Responsible AI",
    ],
  },
];
const footerRoutes: Record<string, string> = {
  "For Talent": "/fortalents",
  "Enabled Jobs": "/foremployers",
  "Enabled AI Agent": "/foremployers/agent",
  "Enabled Academy": "/enableacademy",
  "For Educators": "/students",
  "About": "/about-us",
  "Careers": "/careers",
  "Privacy Policy": "/privacy-policy",
  "Accessibility Policy": "/accessibility-policy",
  "Responsible AI": "/responsible-ai",
  "Blog": "/blogs",
  "FAQs": "/faqs",
  "EnabledAfrica": "/africa",
};

export default function SectionFooter(): JSX.Element {
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState(false);

  const comingSoonCopy: Record<string, { title: string; description: string }> = {
    "Career Coach": {
      title: "Career Coach - Coming Soon",
      description:
        "Personalized career guidance, resume support, and interview prep tailored to your goals. Launching soon.",
    },
    "Partners": {
      title: "Partners - Coming Soon",
      description:
        "We are building our partner directory and collaboration program. Check back soon.",
    },
    "Durham": {
      title: "Durham Case Study - Coming Soon",
      description:
        "We are preparing the Durham case study with outcomes and key learnings. Publishing soon.",
    },
    "Spain": {
      title: "Spain - Coming Soon",
      description:
        "We are preparing our Spain page with regional partners and opportunities. Coming soon.",
    },
    "For NGOs": {
      title: "For NGOs - Coming Soon",
      description:
        "Tools and guidance for NGOs to build inclusive hiring pipelines. Coming soon.",
    },
    "For Governments": {
      title: "For Governments - Coming Soon",
      description:
        "Public sector programs and policy resources to support inclusive employment. Coming soon.",
    },
  };

  const openModalForItem = (item: string) => {
    const copy =
      comingSoonCopy[item] ||
      ({
        title: `${item} - Coming Soon`,
        description: "We are building this section and will share updates soon.",
      } as const);
    setModalContent(copy);
  };

  return (
    <footer
      className="min-h-screen bg-[#f7f4ed] text-slate-900 footer"
      role="contentinfo"
    >
      <div className="mx-auto flex h-full w-full max-w-360 flex-col px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        {/* Top CTA */}
        <div className="mb-12 text-center sm:mb-16 lg:mb-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Inclusive Success
            <br />
            <span className="sm:ml-1">Starts with a Conversation.</span>
          </h2>

          <p className="mx-auto mt-12 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Whether you&apos;re hiring, job-seeking, or building inclusion into
            your programs, we&apos;re here to help you turn purpose into
            progress.
          </p>

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setIsDemoRequestOpen(true)}
              aria-label="Sales demo"
              type="button"
              className="cursor-pointer"
            >
              <Image
                src="/images/SectionFooter/footer-section-sales-demo-button.svg"
                alt=""
                width={220}
                height={64}
                className="h-14 w-auto"
                priority
              />
            </button>
          </div>
        </div>

        {/* Glass card footer */}

        <div className="mt-10 grow sm:mt-14">
          <div className="relative w-full rounded-4xl bg-white/90 p-6 shadow-xl backdrop-blur sm:p-8 lg:p-10">
            {/* Top row: heading + logo & socials */}
            <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-xl">
                <h3 className="text-xl font-bold sm:text-2xl">
                  Building Infrastructure
                  <br className="hidden sm:block" /> for meaningful employment
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Stay informed with cutting-edge AI insights, wellness
                  innovation, and inclusive tech-driven hiring - connecting
                  diverse talent with forward-thinking employers!
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">
                {/* Logo */}
                <Link
                  href="/"
                  aria-label="Go to EnabledTalent home page"
                  className="inline-flex items-center gap-3"
                >
                  <Image
                    src="/images/SectionFooter/footer-logo-icon.svg"
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11"
                  />
                  <span className="text-lg font-semibold text-slate-800">
                    Enabled Talent
                  </span>
                </Link>

                {/* Social icons */}
                <nav
                  aria-label="EnabledTalent social media"
                  className="relative z-20 flex items-center gap-3 pointer-events-auto"
                >
                  <Link
                    href="https://www.linkedin.com/company/enabledtalent/posts/?feedView=all"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="EnabledTalent on LinkedIn (opens in a new tab)"
                    className="inline-flex pointer-events-auto"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f4f5] shadow-sm transition-transform hover:scale-110 sm:h-11 sm:w-11">
                      <Image
                        src="/images/SectionFooter/linkedin.png"
                        alt="LinkedIn"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                  </Link>
                  <Link
                    href="https://www.instagram.com/enabledtalent/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="EnabledTalent on Instagram (opens in a new tab)"
                    className="inline-flex pointer-events-auto"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f4f5] shadow-sm transition-transform hover:scale-110 sm:h-11 sm:w-11">
                      <Image
                        src="/images/SectionFooter/instagram.png"
                        alt="Instagram"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                  </Link>
                  <Link
                    href="https://www.facebook.com/people/Enabled-Talent/61586279129466/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="EnabledTalent on Facebook (opens in a new tab)"
                    className="inline-flex pointer-events-auto"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f4f5] shadow-sm transition-transform hover:scale-110 sm:h-11 sm:w-11">
                      <Image
                        src="/images/SectionFooter/facebook.png"
                        alt="Facebook"
                        width={44}
                        height={44}
                        className="h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] object-contain rounded-full"
                      />
                    </div>
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@enabledtalent"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="EnabledTalent on TikTok (opens in a new tab)"
                    className="inline-flex pointer-events-auto"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f4f5] shadow-sm transition-transform hover:scale-110 sm:h-11 sm:w-11">
                      <Image
                        src="/images/SectionFooter/tiktok%20logo.png"
                        alt="TikTok"
                        width={28}
                        height={28}
                        className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                      />
                    </div>
                  </Link>
                </nav>
              </div>
            </div>

            {/* Bottom row: footer links */}
            <div className="mt-8 grid gap-6 text-sm text-slate-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {footerColumns.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-sm font-bold  tracking-[0.18em] text-black">
                    {col.heading}
                  </h4>
                  <ul className="mt-3 space-y-1.5">
                    {col.items.map((item) => (
                      <li key={item}>
                        {footerRoutes[item] ? (
                          <Link
                            href={footerRoutes[item]}
                            className="hover:text-slate-900 hover:underline text-xs"
                          >
                            {item}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openModalForItem(item)}
                            className="cursor-pointer hover:text-slate-900 hover:underline text-xs text-left"
                          >
                            {item}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
      <ComingSoonModal
        isOpen={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title}
        description={modalContent?.description}
      />
      <DemoRequestModal
        isOpen={isDemoRequestOpen}
        onClose={() => setIsDemoRequestOpen(false)}
        source="footer-sales-demo"
        title="Request a Sales Demo"
      />
    </footer>
  );
}

