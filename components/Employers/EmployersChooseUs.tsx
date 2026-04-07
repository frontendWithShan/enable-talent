import { JSX } from "react";
import Image, { type StaticImageData } from "next/image";

import MatchBased from "@/public/images/Employers/MatchBased.png";
import BiasFree from "@/public/images/Employers/BiasFree.png";
import Inclusive from "@/public/images/Employers/Inclusive.png";
import Faster from "@/public/images/Employers/FasterShortlisting.png";
import IntegratedMessaging from "@/public/images/Employers/IntegratedMessaging.png";
import WhyChooseUsBackground from "@/public/images/Employers/EmployerChooseUsBackground.png";

type SupportItem = {
  id: string;
  title: string;
  description: string;
  icon: StaticImageData;
  iconAlt: string;
};

const items: SupportItem[] = [
  {
    id: "match-based-hiring",
    title: "Match-Based Hiring",
    description:
      "Every applicant is scored, ranked, and clearly explained. No guesswork.",
    icon: MatchBased,
    iconAlt: "Icon representing match-based hiring",
  },
  {
    id: "bias-free-screening",
    title: "Bias-Free Screening",
    description:
      "Structured evaluation that focuses on skills, not background barriers.",
    icon: BiasFree,
    iconAlt: "Icon representing bias-free screening",
  },
  {
    id: "built-for-inclusion",
    title: "Built for Inclusion",
    description: "Welcome candidates with disabilities and underrepresented groups through clear, accessible job postings.",
    icon: Inclusive,
    iconAlt: "Icon representing inclusivity",
    },
    {
    id: "faster-shortlisting",
    title: "Faster Shortlisting",
    description:
      "Skip manual filtering — see your top 10 matches in seconds.",
    icon: Faster,
    iconAlt: "Icon representing faster shortlisting",
  },  {
    id: "integrated-messaging",
    title: "Integrated Messaging",
    description:
      "Auto-generated messages help you follow up quickly and professionally.",
    icon: IntegratedMessaging,
    iconAlt: "Icon representing integrated messaging",
  },
  
];

export default function EmployersChooseUs(): JSX.Element {
  return (
    <section
      aria-labelledby="employers-how-it-works-heading"
      className="py-16 sm:py-20 lg:py-24 relative"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 ">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-6 inline-flex items-center rounded-full bg-neutral-200 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700">
            Why choose ENABLED JOBS
          </p>
          <h2
            id="employers-how-it-works-heading"
            className="text-[2.5rem] font-bold tracking-tight text-[#1A202C]"
          >
            A Smarter Way
            <br className=" md:hidden" />
            <span className="text-[#8C4A0E]"> to Hire Talent</span>
          </h2>
        </header>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              aria-labelledby={`${item.id}-title`}
              className="relative min-h-[260px] rounded-[32px] p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                <div className="space-y-6">
                  <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12),0_8px_10px_-6px_rgba(0,0,0,0.1)] ring-4 ring-white mx-auto sm:mx-0">
                      <Image
                        src={item.icon}
                        alt={item.iconAlt}
                        className="h-[90%] w-[90%] object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <h3
                        id={`${item.id}-title`}
                        className="text-2xl font-bold text-[#0F172A] mb-4 mt-8"
                      >
                        {item.title}
                      </h3>
                      <p className="mt-2 text-base leading-[1.6] text-[#4B5563]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
        <Image
                  src={WhyChooseUsBackground}
                  alt="Hero Banner Background"
                  width={400}
                  height={150}
                  className="absolute hidden md:block md:bottom-4  right-8 sm:w-28 md:w-100 max-w-[90%] "
                />
    </section>
  );
}
