"use client";

import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import { useReveal } from "@/hooks/useReveal";
import CtaIcon from "@/public/logo/ET Logo-01.webp";
import FancyButton from "../FancyButton";

export default function TalentCTA(): JSX.Element {
  const { ref, visible } = useReveal<HTMLElement>();
  const baseAnimation =
    "transform transition-all duration-700 ease-out will-change-transform";
  const hiddenState = "translate-y-6 opacity-0";
  const visibleState = "translate-y-0 opacity-100";

  return (
    <section
      ref={ref}
      aria-labelledby="talent-cta-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-360 px-4 text-center sm:px-6 lg:px-8">
        {/* Icon */}
        <div
          className={`mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20 ${baseAnimation} ${
            visible ? visibleState : hiddenState
          }`}
        >
          <Image
            src={CtaIcon}
            alt="Enabled Talent icon"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Heading */}
        <h2
          id="talent-cta-heading"
          className={`text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl mb-6 ${baseAnimation} ${
            visible ? visibleState : hiddenState
          }`}
          style={{ transitionDelay: "80ms" }}
        >
          Your Next <span className="text-[#E27B43]">Opportunity</span> Awaits
        </h2>

        {/* Description */}
        <p
          className={`mt-4 text-sm leading-relaxed text-[#4B4B4B] sm:text-base ${baseAnimation} ${
            visible ? visibleState : hiddenState
          }`}
          style={{ transitionDelay: "160ms" }}
        >
          Continue to grow with AI-driven résumé optimization and personalized
          interview coaching.
        </p>
        <p
          className={`text-sm leading-relaxed text-[#4B4B4B] sm:text-base ${baseAnimation} ${
            visible ? visibleState : hiddenState
          }`}
          style={{ transitionDelay: "240ms" }}
        >
          {" "}
          Connect with a community of peers who have navigated similar journeys
          for support and mentorship.
        </p>

        {/* CTA button */}
        <div
          className={`mt-8 flex justify-center ${baseAnimation} ${
            visible ? visibleState : hiddenState
          }`}
          style={{ transitionDelay: "320ms" }}
        >
          <Link
            href="https://app.enabledtalent.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get started with Enabled Talent"
            className="inline-flex"
          >
            <FancyButton label="Get Started" as="span" />
          </Link>
        </div>
      </div>
    </section>
  );
}
