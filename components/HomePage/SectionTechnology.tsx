"use client";

import Image from "next/image";
import Link from "next/link";
import { JSX, useRef, useState } from "react";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";
import {
  AudienceId,
  AudienceConfig,
  getAudienceConfig,
  getAudienceTabs,
} from "@/utils/technologyAudience";

export default function SectionTechnology(): JSX.Element {
  const [activeId, setActiveId] = useState<AudienceId>("talents");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tabs: AudienceConfig[] = getAudienceTabs();
  const active = getAudienceConfig(activeId);
  const ctaHref =
    active.ctaLabel === "Explore Opportunities"
      ? "https://app.enabledtalent.com/signup"
      : active.ctaLabel === "Get Started"
        ? "https://app.enabledtalent.com/signup-employer"
        : null;

  const panelRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  /* -----------------------------
      2) Handle tab click
  ----------------------------- */
  const handleTabClick = (id: AudienceId, index: number) => {
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
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
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
      aria-labelledby="technology-heading"
      role="region"
      className="bg-[#182434] py-2 text-slate-100 sm:py-3 lg:py-4 grid-lines-bg-dark"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <p className="mt-14 mx-auto inline-flex items-center rounded-full bg-[#0D3541]/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
            {active.badge}
          </p>

          <h2
            id="technology-heading"
            className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          >
            <span className="text-gradient-warm">Smart Technology.</span> <br />
            <span className="block sm:inline">Human Understanding.</span>{" "}
            <span className="block sm:inline">Real Outcomes.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-base">
            Our platform links NGOs, educators, governments, and talents to
            build accessible pathways from learning to meaningful work.
          </p>

          <nav
            aria-label="Partner types"
            role="tablist"
            className="mt-8 flex flex-col gap-3 sm:inline-flex sm:flex-row sm:flex-wrap sm:justify-center rounded-2xl md:rounded-full border border-white/30 bg-slate-900/70 px-3 py-3"
          >
            {tabs.map((tab, index) => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  id={`technology-tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`technology-tabpanel-${tab.id}`}
                  ref={(el) => {
                    if (el) tabRefs.current[index] = el;
                  }}
                  className={[
                    "flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold",
                    "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#182434] focus-visible:ring-[#f6b738]",
                    "sm:w-auto sm:px-4 sm:py-2 sm:text-xs cursor-pointer",
                    isActive
                      ? "bg-[#f6b738] text-slate-900 shadow-sm hover:bg-[#f4a914] ring-2 ring-white ring-offset-1 ring-offset-[#182434]"
                      : "text-slate-200 hover:bg-slate-800",
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
          id={`technology-tabpanel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`technology-tab-${active.id}`}
          tabIndex={0}
        >
          <article className="border border-white/20 flex flex-col gap-8 rounded-[28px] bg-[#0D3541] px-4 py-6 shadow-lg sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:px-10 lg:py-10">
            <div className="h-64 w-full sm:h-72 md:h-96 lg:h-[400px] lg:w-72">
              <figure className="mx-auto h-full w-full shrink-0 overflow-hidden rounded-3xl">
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  width={580}
                  height={600}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "50% 50%" }}
                />
              </figure>
            </div>

            <div className="flex flex-1 flex-col text-slate-100">
              <h3 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                
                <span className="text-gradient-warm">
                  {active.headingHighlight}
                </span>
                <br />
                {active.headingRest}
              </h3>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {active.benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="border-t border-slate-600 pt-4"
                  >
                    <h4 className="text-xl font-semibold">{benefit.title}</h4>
                    <p className="mt-3 text-base leading-relaxed text-slate-300">
                      {benefit.body}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-300 sm:text-base">
                {active.footer}
              </p>

              <div className="mt-10">
                {ctaHref ? (
                  <Link
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FancyButton
                      label={active.ctaLabel}
                      color="orange"
                      as="span"
                    />
                  </Link>
                ) : (
                  <FancyButton
                    label={active.ctaLabel}
                    color="orange"
                    onClick={() => setIsModalOpen(true)}
                  />
                )}
              </div>

              <ComingSoonModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Partnership Program"
                description="We're building an amazing partnership program to connect with organizations making a difference. Partner registration will be available soon!"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
