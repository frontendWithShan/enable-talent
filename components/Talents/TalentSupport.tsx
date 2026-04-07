import { JSX } from "react";
import Image, { type StaticImageData } from "next/image";

import AdvancementIcon from "@/public/images/Talent/Advancement.png";
import MatchingIcon from "@/public/images/Talent/Matching.png";
import NetworkIcon from "@/public/images/Talent/Network.png";
import PrivacyIcon from "@/public/images/Talent/Privacy.png";

type SupportItem = {
  id: string;
  title: string;
  highlight: string;
  description: string;
  tone: "cream" | "blue";
  icon: StaticImageData;
  iconAlt: string;
};

const items: SupportItem[] = [
  {
    id: "career-advancement",
    title: "Career",
    highlight: "Advancement",
    description:
      "Prepare your profile to highlight your skills and experience, and allow recruiters to discover your talent in a context that emphasizes capability over conventional paths.",
    tone: "cream",
    icon: AdvancementIcon,
    iconAlt: "Icon representing career advancement",
  },
  {
    id: "precision-matching",
    title: "Precision",
    highlight: "Matching",
    description:
      "Your data algorithmically pairs you with employers seeking your unique talents. Get employment matched to your preferences and capabilities.",
    tone: "blue",
    icon: MatchingIcon,
    iconAlt: "Icon representing precision job matching",
  },
  {
    id: "professional-network",
    title: "Professional",
    highlight: "Network",
    description:
      "Connect with mentors and peers who understand your journey. Access resources and communities tailored to your professional growth.",
    tone: "blue",
    icon: NetworkIcon,
    iconAlt: "Icon representing a professional network",
  },
  {
    id: "complete-privacy",
    title: "Complete",
    highlight: "Privacy",
    description:
      "You control what information you share with employers. Your privacy, dignity, and professional story are always protected in our ecosystem.",
    tone: "cream",
    icon: PrivacyIcon,
    iconAlt: "Icon representing data privacy and protection",
  },
];

export default function TalentSupport(): JSX.Element {
  return (
    <section
      aria-labelledby="support-heading"
      className="pb-16 pt-4 sm:pb-24 sm:pt-8"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center sm:mb-12">
          <h2
            id="support-heading"
            className="text-[2.5rem] font-bold tracking-tight text-[#1A202C]"
          >
            How we <span className="text-[#8C4A0E]">support you</span>
          </h2>
        </header>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {items.map((item) => {
            const isCream = item.tone === "cream";
            const cardBg = isCream ? "card-bg-grid-cream" : "card-bg-grid-blue";
            const accent = isCream ? "#D98845" : "#2B6CB0";

            return (
              <article
                key={item.id}
                aria-labelledby={`${item.id}-title`}
                className={`relative min-h-[250px] rounded-[28px] ${cardBg} p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="grid gap-6 md:grid-cols-[65%_35%] md:items-center">
                  {/* Text content */}
                  <div className="order-2 max-w-xl text-center md:order-1 md:text-left">
                    <h3
                      id={`${item.id}-title`}
                      className="text-[1.5rem] font-semibold text-[#1A202C] sm:text-[1.5rem]"
                      style={{ marginBottom: "16px" }}
                    >
                      {item.title}{" "}
                      <span style={{ color: accent }}>{item.highlight}</span>
                    </h3>
                    <p className="text-base font-normal leading-[1.6] text-[#4A5568]">
                      {item.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="order-1 flex justify-center md:order-2">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white ring-4 ring-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] sm:h-[88px] sm:w-[88px]"
                    style={{ borderColor: accent }}
                  >
                    <Image
                      src={item.icon}
                      alt={item.iconAlt}
                      className="h-[90%] w-[90%] rounded-[20px] object-contain"
                    />
                  </div>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
