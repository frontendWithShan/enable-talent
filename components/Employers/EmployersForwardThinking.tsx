"use client";
import React from "react";
import Image from "next/image";
import { JSX } from "react";

type PartnerLogo = {
  src: string;
  alt: string;
  scale?: number;
  bg?: string;
};

const partnerLogos: PartnerLogo[] = [
  { src: "/images/Employers/company/betakit.png", alt: "BetaKit logo" },
  { src: "/images/Employers/company/Founders.png", alt: "Founders logo" },
  { src: "/images/Employers/company/Np.jpg", alt: "NP logo" },
  { src: "/images/Employers/company/TheGlobe.png", alt: "The Globe logo" },
  {
    src: "/images/Employers/company/TheTopVoices.png",
    alt: "The Top Voices logo",
    scale: 3.5,
    bg: "#0f172a",
  },
  { src: "/images/Employers/company/TorontoSun.png", alt: "Toronto Sun logo" },
  { src: "/images/Employers/company/yahoo.png", alt: "Yahoo logo" },
  { src: "/images/Employers/company/business-insider.png", alt: "Business Insider logo" },
  { src: "/images/Employers/company/canadian-sme-lgo.png", alt: "Canadian SME logo", scale: 1.35 },
  { src: "/images/Employers/company/cbc-news-logo.png", alt: "CBC News logo" },
  { src: "/images/Employers/company/ceo-magazine.png", alt: "CEO Magazine logo" },
  { src: "/images/Employers/company/digital-journal.png", alt: "Digital Journal logo", scale: 1.35 },
  { src: "/images/Employers/company/financial-post.png", alt: "Financial Post logo" },
];

export default function EmployersForwardThinking(): JSX.Element {
  return (
    <section
      id="forward-thinking"
      aria-labelledby="forward-thinking-heading"
      className="px-4 sm:px-6 lg:px-8 pb-20"
      suppressHydrationWarning
    >
      <div className="mx-auto mt-20 flex max-w-[1920px] justify-center text-center">
        <div className="text-3xl font-bold tracking-tight text-[#1A202C]">
          <h2 id="forward-thinking-heading" className="pt-6">
            AS SEEN IN
          </h2>
        </div>
      </div>

      <div className="mt-20">
        <div
          className="group relative mx-auto max-w-6xl overflow-hidden rounded-md px-4 py-4"
          aria-label="Logos of trusted partner organizations"
          role="list"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-32 z-50"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 55%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-32 z-50"
            style={{
              background:
                "linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 55%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div
            className="flex w-max animate-marquee gap-5 motion-reduce:animate-none group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "60s" }}
          >
            {partnerLogos.concat(partnerLogos).map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="flex h-12 w-32 items-center justify-center sm:h-14 sm:w-40"
                role="listitem"
                style={
                  logo.bg
                    ? { backgroundColor: logo.bg, padding: "6px", borderRadius: "10px" }
                    : undefined
                }
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={56}
                  sizes="(max-width: 640px) 8rem, (max-width: 1024px) 10rem, 11rem"
                  className="h-full w-full object-contain"
                  style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
