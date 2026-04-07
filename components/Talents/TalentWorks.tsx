import { JSX } from "react";
import Image, { type StaticImageData } from "next/image";

import ProfileIcon from "@/public/images/Talent/profile.png";
import PreferenceIcon from "@/public/images/Talent/preference.png";
import PreciselyIcon from "@/public/images/Talent/precisely.png";
import ConfidenceIcon from "@/public/images/Talent/confidence.png";

type Step = {
  id: string;
  stepLabel: string;
  title: string;
  description: string;
  icon: StaticImageData;
  iconAlt: string;
  tone: "cream" | "blue";
};

const steps: Step[] = [
  {
    id: "create-profile",
    stepLabel: "STEP 1",
    title: "Create Your Profile",
    description:
      "Build a rich profile that highlights your skills and experience. Include your accommodations needs, work preferences, and career goals to ensure the best possible match.",
    icon: ProfileIcon,
    iconAlt: "Illustration for creating a profile",
    tone: "cream",
  },
  {
    id: "set-preferences",
    stepLabel: "STEP 2",
    title: "Set Your Preferences",
    description:
      "Define your career goals, preferred work environments, industry interests, and skills. Our smart filters help ensure you’re only matched with opportunities that align with your preferences.",
    icon: PreferenceIcon,
    iconAlt: "Illustration for setting preferences",
    tone: "blue",
  },
  {
    id: "get-matched",
    stepLabel: "STEP 3",
    title: "Get Matched Precisely",
    description:
      "Let our smart AI do the work matching you with employers seeking your unique talents. Get opportunities tailored to your preferences, with tools to help you shine as a candidate.",
    icon: PreciselyIcon,
    iconAlt: "Illustration for precise matching",
    tone: "cream",
  },
  {
    id: "advance-confidently",
    stepLabel: "STEP 4",
    title: "Advance with Confidence",
    description:
      "Connect with progressive employers who value your unique talents. Move forward with a community of peers and talent advocates to support your career journey.",
    icon: ConfidenceIcon,
    iconAlt: "Illustration for advancing with confidence",
    tone: "blue",
  },
];

export default function TalentWorks(): JSX.Element {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-white pb-16 pt-10 sm:pb-24 sm:pt-14 container mx-auto "
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <header className="mb-10 text-center sm:mb-12">
          <h2
            id="how-it-works-heading"
            className="text-[2.5rem] font-bold tracking-tight text-[#1A202C]"
          >
            How it <span className="text-[#8C4A0E]">works</span>
          </h2>
        </header>

        <div className="grid-lines-bg rounded-[32px] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-10 sm:gap-12">
            {steps.map((step, index) => {
              const isEvenIndex = index % 2 === 0;
              const accent = step.tone === "cream" ? "#D98845" : "#2B6CB0";

              const cardDesktopClasses = isEvenIndex
                ? "md:order-2 md:justify-end"
                : "md:order-1 md:justify-start";

              const textDesktopClasses = isEvenIndex
                ? "md:order-1 md:pr-6 lg:pr-2"
                : "md:order-2 md:pl-6 lg:pl-2";

              return (
                <article
                  key={step.id}
                  aria-labelledby={`${step.id}-title`}
                  className="grid lg:gap-0 rounded-[28px] p-8 md:grid-cols-2 md:items-center sm:p-10"
                >
                  {/* Image card — TOP on mobile, alternates left/right on desktop */}
                  <div
                    className={`order-1 flex justify-center ${cardDesktopClasses}`}
                  >
                    <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-[28px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] sm:h-64 sm:w-64">
                      <Image
                        src={step.icon}
                        alt={step.iconAlt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Text block — BELOW on mobile, alternates on desktop */}
                  <div
                    className={`order-2 max-w-xl text-center md:text-left ${textDesktopClasses}`}
                  >
                    <p className="inline-flex mt-6 items-center rounded-full bg-[#8A4A12] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:text-xs">
                      {step.stepLabel}
                    </p>
                    <h3
                      id={`${step.id}-title`}
                      className="mt-6 text-[1.5rem] font-bold text-[#1A202C]"
                    >
                      {step.title}
                    </h3>
                    <p className="mt-6 text-base leading-[1.6] text-[#49566b]">
                      {step.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
