"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { JSX } from "react";
import FancyButton from "../FancyButton";

import { useReveal } from "@/hooks/useReveal";
import TalentImage1 from "@/public/images/Talent/TalentImage1.jpg";
import TalentImageHelp from "@/public/images/Talent/TalentImageHelp.png";

type SectionContent = {
  title: string;
  highlight: string;
  paragraphs: string[];
  image: StaticImageData;
  imageAlt: string;
  imagePosition: "left" | "right";
};


function SectionCard({
  section,
  index,
}: {
  section: SectionContent;
  index: number;
}): JSX.Element {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const isImageLeft = section.imagePosition === "left";
  const baseAnimation = "reveal-base";
  const visibleState = "reveal-visible";

  return (
    <article ref={ref} className="overflow-hidden rounded-4xl bg-white">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div
          className={`relative order-1 aspect-4/3 w-full sm:aspect-3/2 ${
            isImageLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div
            className={`relative h-full w-full overflow-hidden rounded-[28px] ${baseAnimation} ${
              visible ? visibleState : ""
            }`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </div>

        <div
          className={`order-2 px-6 py-8 sm:px-8 sm:py-12 lg:px-12 ${
            isImageLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div
            className={`${baseAnimation} ${visible ? visibleState : ""}`}
            style={{ transitionDelay: `${120 + index * 80}ms` }}
          >
            <h2 className="text-2xl font-semibold text-[#111827] sm:text-3xl">
              {section.title}{" "}
              <span className="text-[#C25E30]">{section.highlight}</span>
            </h2>

            <div className="mt-6 space-y-4 text-base leading-7 text-[#4B5563]">
              {section.paragraphs.map((p, paragraphIndex) => (
                <p
                  key={`${section.title}-${paragraphIndex}`}
                  className={`${baseAnimation} ${visible ? visibleState : ""}`}
                  style={{
                    transitionDelay: `${
                      220 + paragraphIndex * 120 + index * 80
                    }ms`,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TalentHero(): JSX.Element {
  const sections: SectionContent[] = [
    {
      title: "Your Journey Deserves",
      highlight: "Recognition",
      image: TalentImage1,
      imageAlt: "Two colleagues collaborating while using a laptop",
      imagePosition: "left",
      paragraphs: [
        "At Enabled Talent, careers are built on strengths, not stigma.",
        "For professionals with disabilities, we offer more than opportunity.",
        "We offer a platform that sees you, supports you, and connects you with employers who are ready to champion your brilliance.",
      ],
    },
    {
      title: "A Place Where",
      highlight: "You Belong",
      image: TalentImageHelp,
      imageAlt:
        "Two professionals smiling and working together on a tablet and laptop",
      imagePosition: "right",
      paragraphs: [
        "You're not just applying for a job; you're being welcomed into workplaces that are built to help you thrive.",
        "We only partner with employers who actively embrace difference and understand that great talent comes in many forms.",
      ],
    },
  ];

  return (
    <div className="bg-[#FFFFFF]">
      {/* Hero */}
      <section
        aria-labelledby="for-talents-heading"
        className="pt-8 pb-10 sm:pt-12 sm:pb-14"
      >
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl shadow-sm talentHero ">
            {/* Background image */}

            <div className="relative flex flex-col items-center justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
              <p className="text-xl font-bold uppercase tracking-[0.16em] text-black">
                For Talents
              </p>

              <h1
                id="for-talents-heading"
                className="mt-3 max-w-xl text-center text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl md:text-4xl lg:text-[2.5rem]"
              >
                A Smarter Way to Get Hired
              </h1>

            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section
        aria-label="Why Enabled Talent is different"
        className="pb-16 sm:pb-20"
      >
        <div className="mx-auto flex max-w-360 flex-col gap-10 px-4 sm:px-6 lg:px-8">
          {sections.map((section, index) => (
            <SectionCard key={section.title} section={section} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
