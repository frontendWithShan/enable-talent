"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DemoRequestModal from "@/components/DemoRequestModal";
import ContactUsModal from "@/components/footer/ContactUsModal";
import FancyButton from "@/components/FancyButton";
import FooterComingSoonModal from "@/components/footer/FooterComingSoonModal";
import {
  FOOTER_CTA_DESCRIPTION,
  FOOTER_CTA_LINES,
  FOOTER_COLUMNS,
  FOOTER_HEADING_LINES,
  FOOTER_PARAGRAPHS,
  FOOTER_SOCIALS,
  type FooterLinkItem,
  type FooterSocial,
} from "@/components/footer/footer.config";

type ActiveComingSoon = {
  title: string;
  description: string;
};

const DEFAULT_COMING_SOON_DESCRIPTION =
  "This section is currently in progress. Please check back soon for updates.";

function getComingSoonPayload(item: { label: string; description?: string }): ActiveComingSoon {
  return {
    title: `${item.label} - Coming Soon`,
    description: item.description || DEFAULT_COMING_SOON_DESCRIPTION,
  };
}

const SOCIAL_ICON_SIZE_CLASS: Record<string, string> = {
  LinkedIn: "h-[28px] w-[28px]",
  Instagram: "h-[28px] w-[28px]",
  Facebook: "h-[44px] w-[44px]",
  TikTok: "h-[38px] w-[38px]",
};

export default function UnifiedFooter() {
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [comingSoonItem, setComingSoonItem] = useState<ActiveComingSoon | null>(null);
  const currentYear = new Date().getFullYear();

  const openComingSoonForLink = (item: FooterLinkItem) => {
    setComingSoonItem(getComingSoonPayload(item));
  };

  const openComingSoonForSocial = (social: FooterSocial) => {
    setComingSoonItem(getComingSoonPayload({ label: social.name, description: social.description }));
  };

  return (
    <footer
      className="text-slate-900"
      role="contentinfo"
      style={{
        backgroundImage: 'url("/images/backgroundFooter.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
            {FOOTER_CTA_LINES[0]}
            <br />
            {FOOTER_CTA_LINES[1]}
          </h2>
          <p className="mt-7 text-base leading-relaxed text-slate-600 sm:text-xl">
            {FOOTER_CTA_DESCRIPTION}
          </p>
          <div className="mt-9 flex justify-center">
            <FancyButton
              label="Sales demo"
              color="orange"
              onClick={() => setIsDemoRequestOpen(true)}
              aria-label="Request a sales demo"
            />
          </div>
        </div>

        <div className="mt-14 rounded-[30px] bg-[#2b3038]/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.28)] backdrop-blur sm:p-8 lg:mt-16 lg:p-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <h3 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                {FOOTER_HEADING_LINES[0]}
                <br />
                {FOOTER_HEADING_LINES[1]}
              </h3>

              <div className="flex flex-col items-start gap-5 lg:items-end">
                <Link
                  href="/"
                  aria-label="Go to EnabledTalent home page"
                  className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b3038]"
                >
                  <Image
                    src="/images/SectionFooter/footer-logo-icon.svg"
                    alt="Enabled Talent logo"
                    width={44}
                    height={44}
                    className="h-11 w-11"
                  />
                  <span className="text-2xl font-semibold text-white sm:text-[28px]">
                    EnabledTalent
                  </span>
                </Link>

                <nav aria-label="EnabledTalent social media" className="flex items-center gap-4">
                  {FOOTER_SOCIALS.map((social) =>
                    social.href ? (
                      <Link
                        key={social.name}
                        href={social.href}
                        target={social.external ? "_blank" : undefined}
                        rel={social.external ? "noopener noreferrer" : undefined}
                        aria-label={`EnabledTalent on ${social.name}${social.external ? " (opens in a new tab)" : ""}`}
                        className="inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b3038]"
                      >
                        <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#dcdcdc] bg-[#fbfbfb] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_2px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:scale-[1.04]">
                          <Image
                            src={social.iconSrc}
                            alt={social.name}
                            width={23}
                            height={23}
                            className={`${SOCIAL_ICON_SIZE_CLASS[social.name] || "h-[20px] w-[20px]"} object-contain`}
                          />
                        </span>
                      </Link>
                    ) : (
                      <button
                        key={social.name}
                        type="button"
                        onClick={() => openComingSoonForSocial(social)}
                        aria-label={`${social.name} (coming soon)`}
                        className="inline-flex cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b3038]"
                      >
                        <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#dcdcdc] bg-[#fbfbfb] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_2px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:scale-[1.04]">
                          <Image
                            src={social.iconSrc}
                            alt={social.name}
                            width={23}
                            height={23}
                            className={`${SOCIAL_ICON_SIZE_CLASS[social.name] || "h-[20px] w-[20px]"} object-contain`}
                          />
                        </span>
                      </button>
                    ),
                  )}
                </nav>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {FOOTER_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-6">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <h4 className="text-base font-bold leading-tight text-white sm:text-xl">
                  {column.heading}
                </h4>
                <ul className="mt-4 space-y-2 text-sm leading-snug text-slate-300 sm:text-base">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      {item.label === "Connect With Us" ? (
                        <button
                          type="button"
                          onClick={() => setIsContactUsOpen(true)}
                          className="inline-flex min-h-6 cursor-pointer items-center rounded-sm py-0.5 text-left hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b3038]"
                          aria-label={`${column.heading}: ${item.label}`}
                        >
                          {item.label}
                        </button>
                      ) : item.href ? (
                        <Link
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          aria-label={`${column.heading}: ${item.label}${item.external ? " (opens in a new tab)" : ""}`}
                          className="inline-flex min-h-6 items-center rounded-sm py-0.5 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b3038]"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openComingSoonForLink(item)}
                          className="inline-flex min-h-6 cursor-pointer items-center rounded-sm py-0.5 text-left hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b3038]"
                          aria-label={`${column.heading}: ${item.label} (coming soon)`}
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-right text-xs text-slate-300">
            (c) {currentYear} EnabledTalent. All rights reserved.
          </p>
        </div>
      </div>

      <FooterComingSoonModal
        isOpen={!!comingSoonItem}
        onClose={() => setComingSoonItem(null)}
        title={comingSoonItem?.title || "Coming Soon"}
        description={comingSoonItem?.description || DEFAULT_COMING_SOON_DESCRIPTION}
      />
      <DemoRequestModal
        isOpen={isDemoRequestOpen}
        onClose={() => setIsDemoRequestOpen(false)}
        source="footer-sales-demo"
        title="Request a Sales Demo"
      />
      <ContactUsModal
        isOpen={isContactUsOpen}
        onClose={() => setIsContactUsOpen(false)}
        source="footer-connect-with-us"
        title="Connect With Us"
      />
    </footer>
  );
}
