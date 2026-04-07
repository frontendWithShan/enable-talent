"use client";

import Image from "next/image";
import { JSX, KeyboardEvent, useRef, useState } from "react";
import EmployerDashBoard from "@/public/images/Employers/EmployerDashboard.png";
import Tic from "@/public/images/Employers/Tic.svg";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";
import greenTick from "@/public/images/Employers/greenTick.svg";

type PlanId = "single" | "multi" | "enterprise";

type PlanBenefit = {
  title: string;
  body: string;
};

type PlanConfig = {
  id: PlanId;
  label: string;
  headingHighlight: string;
  badges: { label: string; className: string }[];
  subtitle: string;
  priceAmount: string;
  priceDescription: string;
  benefits: PlanBenefit[];
  footer: string;
  ctaLabel: string;
  ctaColor: "navy" | "orange";
};

const PLAN_CONFIGS: Record<PlanId, PlanConfig> = {
  single: {
    id: "single",
    label: "Single Job Post",
    headingHighlight: "Post one job and instantly reach verified candidates.",
    badges: [
      {
        label: "Single Job Post",
        className: "bg-[#efe9dc] text-slate-900",
      },
    ],
    subtitle: "Perfect for quick hiring needs.",
    priceAmount: "CAD 300",
    priceDescription: "per job post",
    benefits: [
      { title: "30-day active listing", body: "" },
      { title: "Full job posting features", body: "" },
      { title: "Email support", body: "" },
    ],
    footer: "Perfect for quick hiring needs.",
    ctaLabel: "View all plans",
    ctaColor: "orange",
  },
  multi: {
    id: "multi",
    label: "Multi Job Package",
    headingHighlight: "Hire faster with bulk posting and priority support.",
    badges: [
      {
        label: "Multi Job Package",
        className: "bg-slate-200 text-slate-800",
      },
      {
        label: "Most Popular",
        className: "bg-green-100 text-green-800",
      },
    ],
    subtitle: "Most Popular for Growing Teams.",
    priceAmount: "CAD 1,500",
    priceDescription: "10 job credits",
    benefits: [
      { title: "10 job credits", body: "" },
      { title: "Priority support", body: "" },
      { title: "Bulk discount included", body: "" },
    ],
    footer:
      "Best for growing teams with steady hiring needs. Keep your funnel full while coordinating across departments.",
    ctaLabel: "View all plans",
    ctaColor: "navy",
  },
  enterprise: {
    id: "enterprise",
    label: "Enterprise",
    headingHighlight:
      "Built for organizations with continuous & high-volume hiring needs.",
    badges: [
      {
        label: "Enterprise",
        className: "bg-[#efe9dc] text-slate-900",
      },
    ],
    subtitle: "Custom Pricing - Unlimited job posts",
    priceAmount: "Contact us",
    priceDescription: "for tailored pricing",
    benefits: [
      { title: "Unlimited job posts", body: "" },
      { title: "Dedicated account manager", body: "" },
      { title: "Custom integrations", body: "" },
    ],
    footer:
      "Built for larger organizations with specialized roles and accessibility standards.",
    ctaLabel: "Contact Sales",
    ctaColor: "orange",
  },
};

export default function EmployersPricingTeaser(): JSX.Element {
  const [activeId, setActiveId] = useState<PlanId>("single");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tabs: { id: PlanId; label: string }[] = [
    { id: "single", label: "Single Job Post" },
    { id: "multi", label: "Multi Job Package" },
    { id: "enterprise", label: "Enterprise" },
  ];
  const active = PLAN_CONFIGS[activeId];

  const panelRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  /* -----------------------------
      2) Handle tab click
  ----------------------------- */
  const handleTabClick = (id: PlanId, index: number) => {
    setActiveId(id);

    // Update roving tabIndex
    tabRefs.current.forEach((btn, i) => {
      if (btn) btn.tabIndex = i === index ? 0 : -1;
    });

    // Scroll only on MOBILE (<1024px)
    if (window.innerWidth < 1024 && panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const panelPosition = rect.top + scrollTop;
      const offset = window.innerHeight * 0.3; // 70% scroll position

      window.scrollTo({
        top: panelPosition - offset,
        behavior: "smooth",
      });
    }
  };

  /* -----------------------------
      3) Roving Tablist Keyboard Nav
  ----------------------------- */
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const lastIndex = tabs.length - 1;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = index === lastIndex ? 0 : index + 1;
      tabRefs.current[next]?.focus();
      handleTabClick(tabs[next].id, next);
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = index === 0 ? lastIndex : index - 1;
      tabRefs.current[prev]?.focus();
      handleTabClick(tabs[prev].id, prev);
    }

    if (e.key === "Home") {
      e.preventDefault();
      tabRefs.current[0]?.focus();
      handleTabClick(tabs[0].id, 0);
    }

    if (e.key === "End") {
      e.preventDefault();
      tabRefs.current[lastIndex]?.focus();
      handleTabClick(tabs[lastIndex].id, lastIndex);
    }
  };

  return (
  <section
    aria-labelledby="pricing-heading"
    className="py-2 text-slate-900 sm:py-3 lg:py-4 bg-[#F6F6F6]"
    role="region"
  >
    <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
      <header className="text-center">
        <p className="mt-14 mx-auto inline-flex items-center rounded-full bg-slate-200 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900">
          PRICING TEASER
        </p>
        <h2
          id="pricing-heading"
          className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
        >
          Flexible Plans for Every Team
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Whether you&apos;re hiring for one role or scaling across departments —
          we have a plan for you. Choose the perfect plan for your hiring
          needs. All job posts are active for 30 days.
        </p>

        <nav
          aria-label="Pricing plans"
          role="tablist"
          className="mt-8 flex flex-col gap-3 sm:inline-flex sm:flex-row sm:flex-wrap sm:justify-center rounded-2xl md:rounded-full border border-slate-200 bg-transparent px-3 py-3"
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                id={`plan-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`plan-panel-${tab.id}`}
                ref={(el) => {
                  if (el) tabRefs.current[index] = el;
                }}
                className={[
                  "flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold",
                  "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#f6b738]",
                  "sm:w-auto sm:px-4 sm:py-2 sm:text-xs cursor-pointer",
                  isActive
                    ? "bg-[#f6b738] text-slate-900 shadow-sm hover:bg-[#f4a914]"
                    : "text-slate-600 hover:bg-slate-100",
                ].join(" ")}
                tabIndex={index === 0 ? 0 : -1}
                onClick={() => handleTabClick(tab.id, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      <div
        ref={panelRef}
        className="mt-10 mb-14 sm:mt-12 scroll-mt-24"
        id={`plan-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`plan-tab-${active.id}`}
        tabIndex={0}
      >
        <article
          className="relative overflow-hidden border border-slate-200 flex flex-col gap-8 rounded-[28px] px-4 py-6 shadow-lg sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:px-10 lg:py-10"
          style={{
            background:
              activeId === "multi"
                ? "linear-gradient(to right, #FBFDFF, #EAF4FF)"
                : "linear-gradient(to right, #FFF8EA, #FFE2A7)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col text-slate-900 lg:w-[40%]">
            <div className="flex flex-wrap gap-2" aria-label="Plan badges">
              {active.badges.map((badge) => (
                <p
                  key={badge.label}
                  className={`inline-flex mb-4 items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${badge.className}`}
                >
                  {badge.label === "Most Popular" && (
                    <Image src={greenTick} alt="" width={24} height={24} />
                  )}
                  {badge.label}
                </p>
              ))}
            </div>
            <h3 className="mt-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
              {active.headingHighlight}
            </h3>
            {active.subtitle && (
              <p className="mt-3 text-sm text-slate-700">{active.subtitle}</p>
            )}
            {active.priceAmount && (
              <div className="mt-4" aria-label="Pricing">
                <p className="text-3xl mb-2 font-bold text-slate-900">
                  {active.priceAmount}
                </p>
                {active.priceDescription && (
                  <p className="text-sm text-slate-500">
                    {active.priceDescription}
                  </p>
                )}
              </div>
            )}
            <div className="mt-8">
              <FancyButton
                label={active.ctaLabel}
                color={active.ctaColor}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            <ul className="mt-6 space-y-3 lg:space-y-0 lg:flex lg:flex-wrap lg:gap-x-6 lg:gap-y-4">
              {active.benefits.map((benefit) => (
                <li
                  key={benefit.title}
                  className="flex items-center gap-3 text-sm text-slate-800"
                >
                  <Image src={Tic} alt="" width={20} height={20} />
                  <span>{benefit.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image (desktop only) */}
          <div className="relative z-10 hidden lg:block lg:flex-1">
            <figure
              className="mx-auto h-[400px] w-72 shrink-0 rounded-3xl bg-white"
              style={{ transform: "rotate(-20deg)" }}
            >
              <Image
                src={EmployerDashBoard}
                alt="Employer dashboard preview"
                width={580}
                height={600}
                className="h-full w-full object-cover absolute"
              />
            </figure>
          </div>
        </article>
      </div>
    </div>

    <ComingSoonModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Pricing Plans"
      description="We're finalizing our pricing plans and payment systems to provide you with the best value. Detailed pricing and plan selection will be available soon!"
    />
  </section>
);
}