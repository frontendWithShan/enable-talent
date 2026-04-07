"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";
import { useState } from "react";
import ComingSoonModal from "@/components/ComingSoonModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const columns = [
  {
    title: "Product",
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
  { title: "Case Studies", items: ["Durham"] },
  { title: "Countries", items: ["EnabledAfrica", "Spain"] },
  { title: "Resources", items: ["Blog", "FAQs"] },
  { title: "Company", items: ["About", "Partners", "Careers"] },
  {
    title: "Legal",
    items: ["Privacy Policy", "Accessibility Policy", "Responsible AI"],
  },
];

const socials = ["linkedin", "slack", "youtube", "twitter"] as const;
const footerRoutes: Record<string, string> = {
  "For Talent": "/fortalents",
  "Enabled Jobs": "/foremployers",
  "Enabled AI Agent": "/foremployers/agent",
  "Enabled Academy": "/enableacademy",
  "For Educators": "/students",
  About: "/about-us",
  Careers: "/careers",
  "Privacy Policy": "/privacy-policy",
  "Accessibility Policy": "/accessibility-policy",
  "Responsible AI": "/responsible-ai",
  Blog: "/blogs",
  FAQs: "/faqs",
  EnabledAfrica: "/africa",
};

export default function AcademyJourneyFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const openComingSoon = (item: string) => {
    setModalContent({
      title: item,
      description: "This page is coming soon. Check back soon for updates!",
    });
    setIsModalOpen(true);
  };

  return (
    <section
      className={`${plusJakartaSans.className} bg-white px-4 pb-20 pt-16 sm:pt-20 lg:pt-24`}
      style={{
        backgroundImage:
          'url("/images/Footer%20background/footer%20background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-[56px]">
          Start Your Journey With
          <br className="hidden sm:block" />
          <span className="text-slate-900"> Enabled Academy</span>
        </h2>
        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg lg:text-[20px]">
          Whether you&apos;re looking to grow your skills or build your team,
          Enabled Academy is here to help.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="https://app.enabledtalent.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
            aria-label="Join as a talent"
          >
            <FancyButton label="Join as a Talent" color="orange" as="span" />
          </Link>
          <Link
            href="https://app.enabledtalent.com/login-employer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
            aria-label="Partner as an employer"
          >
            <FancyButton
              label="Partner as an Employer"
              color="navy"
              as="span"
            />
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl rounded-[22px] bg-[#f6f6f6] px-4 py-6 shadow-lg sm:mt-14 sm:px-10 sm:py-10 lg:px-14">
        <div className="flex flex-col gap-5 border-b border-slate-200/70 pb-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl text-center sm:text-left">
            <h3 className="text-[22px] font-extrabold text-slate-900 sm:text-3xl lg:text-[42px]">
              Building Infrastructure
              <br />
              for meaningful employment
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-slate-700 sm:text-base">
              Stay informed with cutting-edge AI insights, wellness innovation,
              and inclusive tech-driven hiring, connecting diverse talent with
              forward-thinking employers!
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:items-end">
            <div className="flex items-center gap-3">
              <Image
                src="/images/SectionFooter/footer-logo-icon.svg"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11"
              />
              <span className="text-xl font-semibold text-slate-800">
                EnabledTalent
              </span>
            </div>
            <div className="relative z-10 flex items-center gap-3 pointer-events-auto">
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
                    width={36}
                    height={36}
                    className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {columns.map((col) => (
            <div key={col.title} className="space-y-3 text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {col.items.map((item) => (
                  <li key={item}>
                    {footerRoutes[item] ? (
                      <Link
                        href={footerRoutes[item]}
                        className="hover:text-slate-900 hover:underline"
                      >
                        {item}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openComingSoon(item)}
                        className="text-left hover:text-slate-900 hover:underline"
                        aria-label={`${item} (coming soon)`}
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

        {/* Copyright */}
        <p className="mt-4 text-right text-xs text-slate-600">
          (c) 2026 EnabledTalent. All rights reserved.
        </p>
      </div>
      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent?.title}
        description={modalContent?.description}
      />
    </section>
  );
}

