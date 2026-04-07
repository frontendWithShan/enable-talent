import { JSX } from "react";
import Image, { type StaticImageData } from "next/image";

import AdvancementIcon from "@/public/images/Talent/Advancement.png";
import MatchingIcon from "@/public/images/Talent/Matching.png";


type SupportItem = {
  id: string;
  title: string;
  tone: "cream" | "blue";
  icon: StaticImageData;
  iconAlt: string;
};

const items: SupportItem[] = [
  {
    id: "natural-language-role-input",
    title: "Natural Language Role Input",
    tone: "cream",
    icon: AdvancementIcon,
    iconAlt: "Icon representing career advancement",
  },
  {
    id: "smart-skill-extraction",
    title: "Smart Skill Extraction",
    tone: "blue",
    icon: MatchingIcon,
    iconAlt: "Icon representing precision job matching",
  },
  {
    id: "real-time-candidate-discovery",
    title: "Real-Time Candidate Discovery",
    tone: "cream",
    icon: AdvancementIcon,
    iconAlt: "Icon representing career advancement",
  },
  {
    id: "automatic-ranking",
    title: "Automatic Ranking",
    tone: "blue",
    icon: MatchingIcon,
    iconAlt: "Icon representing precision job matching",
  },
  {
    id: "comprehensive-fit-reports",
    title: "Detailed Fit Reports",
    tone: "cream",
    icon: AdvancementIcon,
    iconAlt: "Icon representing career advancement",
  },
  {
    id: "accessibility-aware-screening",
    title: "Accessibility-Aware Screening",
    tone: "blue",
    icon: MatchingIcon,
    iconAlt: "Icon representing precision job matching",
  },
  {
    id: "proactive-pipeline-building",
    title: "Proactive Pipeline Building",
    tone: "cream",
    icon: AdvancementIcon,
    iconAlt: "Icon representing career advancement",
  },
  {
    id: "auto-crafted-employer-messages",
    title: "Auto-Crafted Employer Messages",
    tone: "blue",
    icon: MatchingIcon,
    iconAlt: "Icon representing precision job matching",
  },
  {
    id: "multi-role-handling",
    title: "Multi-role handling at once",
    tone: "cream",
    icon: AdvancementIcon,
    iconAlt: "Icon representing career advancement",
  },
];

export default function EnableAgentCoreFeatures(): JSX.Element {
  return (
    <section
      aria-labelledby="support-heading"
      className="pb-16 pt-4 sm:pb-24 sm:pt-8 mt-4"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center sm:mb-12 mt-14">
          <p className="inline-flex mb-10 w-fit items-center rounded-full bg-[#F3F4F6] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1F2937]">
            Core Features
          </p>
          <h2
            id="support-heading"
            className="text-[2.5rem] font-bold tracking-tight text-[#1A202C]"
          >
            Everything a Recruiter Does <br />
            <span className="text-[#8C4A0E]">Done Automatically</span>
          </h2>
        </header>

        <ul
          className="grid auto-rows-fr gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {items.map((item) => {
            const isCream = item.tone === "cream";
            const cardBg = isCream ? "card-bg-grid-cream" : "card-bg-grid-blue";
            const accent = isCream ? "#D98845" : "#2B6CB0";

            return (
              <li key={item.id}>
                <article
                  aria-labelledby={`${item.id}-title`}
                  className={`relative h-full rounded-[28px] ${cardBg} p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                    <div className="flex justify-center">
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white ring-4 ring-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] sm:h-[88px] sm:w-[88px]"
                        style={{ borderColor: accent }}
                        aria-hidden="true"
                      >
                        <Image
                          src={item.icon}
                          alt={item.iconAlt}
                          className="h-[90%] w-[90%] rounded-[20px] object-contain"
                        />
                      </div>
                    </div>

                    <h3
                      id={`${item.id}-title`}
                      className="text-[1.5rem] font-bold text-black sm:text-[1.5rem]"
                    >
                      {item.title}
                    </h3>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
